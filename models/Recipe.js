const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  action: String,
  ingredients: [String],
  utensils: [String],
  text: String,
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  recipeImage: {
    type: String,
    default: './public/images/recipe_default.jpg', 
  },
  preparationTime: {
    type: Number,
    min: 0,
  },
  cookingTime: {
    type: Number,
    min: 0, 
  },
  difficulty: String, 
  price: String, 
  serves: {
    type: Number,
    min: 1, 
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  preparationInstructions: [instructionSchema],
  cookingInstructions: [instructionSchema],
  servingInstructions: [instructionSchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;


//TODO modifier le champs ingredient en sorte de memoriser la quantité et l'unité de mesure choisi, ainsi que le id de l'ingredient