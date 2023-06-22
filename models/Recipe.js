import mongoose from 'mongoose';

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

export default Recipe;

//TODO modifier le champs ingredient en sorte de memoriser la quantité et l'unité de mesure choisi, ainsi que le id de l'ingredient