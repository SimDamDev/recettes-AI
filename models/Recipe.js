const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  recipeImage: String, 
  preparationTime: Number,
  cookingTime: Number,
  difficulty: String, 
  price: String, 
  serves: Number,
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  preparationInstructions: [
    {
      action: String,
      ingredients: [String],
      utensils: [String],
      text: String,
    },
  ],
  cookingInstructions: [
    {
      action: String,
      ingredients: [String],
      utensils: [String],
      text: String,
    },
  ],
  servingInstructions: [
    {
      action: String,
      ingredients: [String],
      utensils: [String],
      text: String,
    },
  ],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;