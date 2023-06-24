const ingredientPrompt = `Génère-moi un fichier JSON correspondant au schéma suivant :
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

Crée un objet ingrédient avec le nom 'Tomate' en utilisant ce schéma.

La reponse doit contenir au moins une valeur pour chaque champs, et doit être un objet JSON valide.`;

module.exports = {
  ingredientPrompt
};
