// Select the form
const form = document.querySelector('form');
const switchInput = document.getElementById('pluralSwitch');



// Add an event listener for the focus event
switchInput.addEventListener('focus', function() {
    // Remove focus from the switch
    this.blur();
  });

// Select the plural name field
const pluralNameField = document.getElementById('pluralName');

pluralNameField.disabled = true;


switchInput.addEventListener('change', function() {
    pluralNameField.disabled = !this.checked;
});

const autoFillSwitch = document.getElementById('autoFill');
const pluralSwitch = document.getElementById('pluralSwitch');
const unitsField = document.getElementById('units');

// Add an event listener to the autoFill switch
autoFillSwitch.addEventListener('change', function() {
  // If the autoFill switch is checked, disable the pluralName field and the units field
  if (this.checked) {
    pluralNameField.disabled = true;
    pluralSwitch.disabled = true;
    unitsField.disabled = true;
  } else {
    // If the autoFill switch is not checked, enable the pluralName field and the units field
    pluralNameField.disabled = false;
    pluralSwitch.disabled = false;
    unitsField.disabled = false;
  }
  // Update the button label whenever the switch is toggled
  changeButtonLabel(this.checked);
});

document.getElementById('submitButton').addEventListener('click', async function() {
  const name = document.getElementById('name').value;
  const autoFill = document.getElementById('autoFill').checked;

  if (autoFill) {
    console.log("GPT-3 Request:", name); // affichez le nom de l'ingrédient dans la console
      const response = await fetch('/api/gpt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name }) // envoyez juste le nom de l'ingrédient
      });

      const data = await response.json();
      console.log("GPT-3 Response:", data); // affichez la réponse de GPT-3 dans la console

      // Utilisez les données générées pour remplir les champs de formulaire ici
  } else {
     // Add an event listener for the form submission
form.addEventListener('submit', event => {
  // Prevent the form from being submitted the default way
  event.preventDefault();

  // Create a new FormData object from the form
  const formData = new FormData(form);

  // Convert the FormData to JSON
  const ingredient = Object.fromEntries(formData.entries());

  // Send the JSON data to your API
  fetch('http://localhost:3000/api/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Here you can do something with the response, like showing a success message
  })
  .catch((error) => {
    console.error('Error:', error);
    // Here you can handle errors, like showing an error message
  });
});
  }
});

const nameField = document.getElementById('name');

// Add an event listener for the input event
nameField.addEventListener('input', function() {
  // Only fill the pluralName field automatically if both switches are not checked
  if (!autoFillSwitch.checked && !pluralSwitch.checked) {
    pluralNameField.value = this.value + 's';
  }
});

function changeButtonLabel(isAutoFill) {
    const submitButton = document.getElementById('submitButton');
    submitButton.textContent = isAutoFill ? 'Générer' : 'Ajouter';
}

// Initialise le label du bouton
changeButtonLabel(document.getElementById('autoFill').checked);