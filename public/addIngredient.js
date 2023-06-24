'use strict';
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
   // Remove the form submission event listener if it already exists
  form.removeEventListener('submit', handleSubmit);
   if (!this.checked) {
    // Add an event listener for the form submission
    form.addEventListener('submit', handleSubmit);
  }
});
 async function handleAutoFill(name) {
  console.log('GPT-3 Request:', name); // log the ingredient name to the console
   try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }) // send only the ingredient name
    });
     const data = await response.json();
    console.log('GPT-3 Response:', data); // log the GPT-3 response to the console
     // Use the generated data to fill in the form fields here
  } catch (error) {
    console.error('Error:', error); // handle errors here
  }
}
 function handleSubmit(event) {
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
    .catch(error => {
      console.error('Error:', error);
      // Here you can handle errors, like showing an error message
    });
}
const nameField = document.getElementById('name');
const nameErrorElement = document.getElementById('nameError');
 // Add an event listener for the input event
nameField.addEventListener('input', function() {
  const nameFieldValue = nameField.value;
  nameField.value = nameField.value.charAt(0).toUpperCase() + nameField.value.slice(1).toLowerCase();
  // Only fill the pluralName field automatically if both switches are not checked
  if (!autoFillSwitch.checked && !pluralSwitch.checked && nameFieldValue) {
    pluralNameField.value = `${nameFieldValue}s`;
  }
  if (/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(nameFieldValue)) {
    nameErrorElement.textContent = `Le nom "${nameFieldValue}" n'est pas valide. Il ne doit pas contenir de chiffres ni de caractères spéciaux.`;
    return;
  } else {
    // Clear the error message if the name is valid
    nameErrorElement.textContent = '';
  }
});
 function changeButtonLabel(isAutoFill) {
  const submitButton = document.getElementById('submitButton');
  submitButton.textContent = isAutoFill ? 'Generer' : 'Ajouter';
}
 // Initialize the button label
changeButtonLabel(autoFillSwitch.checked);