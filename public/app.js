// Replace this URL with the URL of your own API.
const recipeApiUrl = 'http://localhost:3000/api/recipes/6492d88dd9de2dae6fc077b6';
fetch(recipeApiUrl)
  .then(response => response.json())
  .then(recipe => {
    // Store the elements in variables
    const recipeTitle = document.getElementById('recipe-title');
    const preparationTime = document.getElementById('preparation-time');
    const cookingTime = document.getElementById('cooking-time');
    const serves = document.getElementById('serves');
    const totalTime = document.getElementById('total-time');
    const difficulty = document.getElementById('difficulty');
    const price = document.getElementById('price');
    const recipeImage = document.getElementById('recipe-image');
    const ingredientsList = document.getElementById('ingredients-list');
    const preparationInstructionsContainer = document.getElementById('preparation-instructions');
    const cookingInstructionsContainer = document.getElementById('cooking-instructions');
    const servingInstructionsContainer = document.getElementById('serving-instructions');

    // Create the instruction titles
    const preparationInstructionsTitle = document.createElement('h3');
    preparationInstructionsTitle.textContent = 'Préparation: ';
    const cookingInstructionsTitle = document.createElement('h3');
    cookingInstructionsTitle.textContent = 'Cuisson: ';
    const servingInstructionsTitle = document.createElement('h3');
    servingInstructionsTitle.textContent = 'Service: ';

    // Update the elements with the recipe data
    recipeTitle.textContent = recipe.title;
    preparationTime.textContent = `Préparation : ${recipe.preparationTime} min`;
    cookingTime.textContent = `Cuisson : ${recipe.cookingTime} min`;
    serves.textContent = `Pour ${recipe.serves} personnes`;
    totalTime.textContent = `Temps: ${recipe.preparationTime + recipe.cookingTime} min`;
    difficulty.textContent = `Difficulté : ${recipe.difficulty}`;
    price.textContent = `Cout : ${recipe.price}`;

    // Add the recipe image
    recipeImage.src = recipe.recipeImage;
    recipeImage.onerror = function() {
      this.onerror = null;
      this.src = '/recipe_default.jpeg';
    }

    // Remove existing child nodes from the ingredients list
    while (ingredientsList.firstChild) {
      ingredientsList.removeChild(ingredientsList.firstChild);
    }

// Add the ingredients to the list
recipe.ingredients.forEach(ingredient => {
  const ingredientElement = document.createElement('div');
  ingredientElement.classList.add('ingredient-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const ingredientImage = document.createElement('img');
  ingredientImage.src = ingredient.image;
  ingredientImage.onerror = function() {
    this.onerror = null;
    this.src = '/ingredient_default.jpeg';
  };
  imageContainer.appendChild(ingredientImage);
  ingredientElement.appendChild(imageContainer);

  const ingredientText = document.createElement('div');
  ingredientText.classList.add('ingredient-text');

  const quantityText = document.createElement('p');
  quantityText.classList.add('quantity-text');

  if (ingredient.unit === 'piece') {
    quantityText.textContent = `${ingredient.quantity}`;
  } else {
    quantityText.textContent = `${ingredient.quantity} ${ingredient.unit}`;
  }

  ingredientText.appendChild(quantityText);

  if (ingredient.unit !== 'piece') {
    ingredientText.appendChild(document.createTextNode(' de'));
  }

  ingredientText.appendChild(document.createTextNode(' ' + ingredient.name));
  ingredientElement.appendChild(ingredientText);

  ingredientsList.appendChild(ingredientElement);
});

    // Update the instructions containers
    preparationInstructionsContainer.classList.add('instructions-card');
    preparationInstructionsContainer.appendChild(preparationInstructionsTitle);
    const preparationInstructionsContent = document.createElement('div');
    preparationInstructionsContent.innerHTML = formatInstructions(recipe.preparationInstructions);
    preparationInstructionsContainer.appendChild(preparationInstructionsContent);

    cookingInstructionsContainer.classList.add('instructions-card');
    cookingInstructionsContainer.appendChild(cookingInstructionsTitle);
    const cookingInstructionsContent = document.createElement('div');
    cookingInstructionsContent.innerHTML = formatInstructions(recipe.cookingInstructions);
    cookingInstructionsContainer.appendChild(cookingInstructionsContent);

    servingInstructionsContainer.classList.add('instructions-card');
    servingInstructionsContainer.appendChild(servingInstructionsTitle);
    const servingInstructionsContent = document.createElement('div');
    servingInstructionsContent.innerHTML = formatInstructions(recipe.servingInstructions);
    servingInstructionsContainer.appendChild(servingInstructionsContent);
  })
  .catch(error => {
    console.error('Erreur :', error);
     // Afficher un message d'erreur convivial pour l'utilisateur
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Une erreur est survenue lors du chargement de la recette. Veuillez réessayer plus tard.';
    document.body.appendChild(errorMessage);
  });



  function formatInstructions(instructions, type) {
    let formattedInstructions = '';
    instructions.forEach((instruction, index) => {
      let words = instruction.text.split(' ');
      let number = index + 1;
      let iconCount = instruction.ingredients ? instruction.ingredients.length : 0;
      let ingredientIcons = '';
      if (instruction.ingredients) {
        instruction.ingredients.forEach(ingredient => {
          let regex = new RegExp(`\\b${ingredient}\\b`, 'gi');
          words = words.map(word => word.replace(regex, `<i>${ingredient}</i>`));
          ingredientIcons += `<img src="path_to_your_icon" class="ingredient-icon" alt="${ingredient}">`;
        });
      }
      if (instruction.action) {
        let actionKeywords = instruction.action.split(' ');
        actionKeywords.forEach(keyword => {
          let regex = new RegExp(`\\b${keyword}\\b`, 'gi');
          words = words.map(word => word.replace(regex, `<strong>${keyword}</strong>`));
        });
      }
      let text = words.join(' ');
      formattedInstructions += `
        <div class="instruction-step">
          <div class="icon-column">
            <span class="${type}-step-number step-circle">${number}</span>
          </div>
          <div class="text-column">${text}</div>
          <div class="ingredient-icons-column">${ingredientIcons}</div>
        </div>`;
    });
    return formattedInstructions;
  }