const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  pluralName: {
    type: String,
    required: true,
    trim: true, 
  },
  units: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    default: './public/images/ingredient_default.jpg', 
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;

//TODO quantité a gerer das recette et pas ici!