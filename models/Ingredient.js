import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pluralName: {
    type: String,
    required: true,
  },
  units: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;

//TODO quantité a gerer das recette et pas ici!