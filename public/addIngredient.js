
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
const loadingMessageElement = document.getElementById('loadingMessage');

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

async function handleAutoFill(name) {
  console.log('GPT-3 Request:', name); // log the ingredient name to the console

  // Display the loading message
  loadingMessageElement.textContent = 'Generation en cours....';

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

    // Extract the JSON object from the content property
    const contentStart = data.content.indexOf('{');
    const contentEnd = data.content.lastIndexOf('}') + 1;
    const content = JSON.parse(data.content.substring(contentStart, contentEnd));
    document.getElementById('pluralName').value = content.pluralName || '';
    document.getElementById('pluralName').dispatchEvent(new Event('input'));
    document.getElementById('units').value = content.units || '';
    document.getElementById('units').dispatchEvent(new Event('input'));
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewPluralName').textContent = content.pluralName || 'N/A';
    document.getElementById('previewUnits').textContent = content.units || 'N/A';
    document.getElementById('ingredientPreview').style.display = 'block';

    // Call the generateImages function here
    generateImages(name);

    loadingMessageElement.textContent = '';
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
  if (/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\//\\\/]/.test(nameFieldValue)) {
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

async function checkIngredient(nameFieldValue) {

  loadingMessageElement.textContent = 'Verification en cours...';

  const checkResponse = await fetch('/api/gpt/check', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nameFieldValue })
  });
  const checkData = await checkResponse.json();
  console.log('GPT-3 Response:', checkData);

  if (!checkData.content.trim().startsWith("Oui")) { // Suppose que la réponse de GPT-3 commence par "Oui" si c'est un ingrédient
    // Affichez une erreur sur la page
    const errorDiv = document.getElementById('nameError');
    errorDiv.innerHTML = "GPT ne considère pas cela comme un ingrédient.<br> Essayez un autre nom ou de le créer manuellement.";
    errorDiv.style.display = "block"; // Ajoutez cette ligne pour définir le style "display" sur "block"
    loadingMessageElement.textContent = "";
    return false;
  }
  
  return true;
}

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const nameFieldValue = nameField.value;
  const isIngredient = await checkIngredient(nameFieldValue);
  

  if (isIngredient) {
    if (autoFillSwitch.checked) {
      handleAutoFill(nameFieldValue);
    } else {
      handleSubmit(event);
    }
  }
});

function displayImages(imageUrls) {
  const imageContainer = document.getElementById('imageContainer');

  imageContainer.innerHTML = '';

  imageUrls.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Generated image';
    img.style.width = '256px';
    img.style.height = '256px';
    imageContainer.appendChild(img);
  });
}

changeButtonLabel(autoFillSwitch.checked);

autoFillSwitch.checked = true;

autoFillSwitch.dispatchEvent(new Event('change'));

const generateImagesButton = document.getElementById('generateImagesButton');

async function generateImages(name) {
  console.log('Image Generation Request:', name); 

  try {
    const imgResponse = await fetch('/api/gpt/image', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }) 
    });

    const imgData = await imgResponse.json();
    console.log('Image Generation Response:', imgData);

    displayImages(imgData.imageUrls);
  } catch (error) {
    console.error('Error:', error); 
  }
}

generateImagesButton.addEventListener('click', function() {
  const name = nameField.value; 
  generateImages(name); 
});

function displayImages(imageUrls) {
  const imageContainer = document.getElementById('imageContainer');

  imageContainer.innerHTML = '';

  imageUrls.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Generated image';
    img.style.width = '256px';
    img.style.height = '256px';
    imageContainer.appendChild(img);
  });
}

//TODO ameliorer la choix des unités