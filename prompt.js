const ingredientPrompt = `({
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

Pour les unités, choisi parmi les suivants:
Gramme (g), Kilogramme (kg), Milligramme (mg), Litre (l), Millilitre (ml), Cuillère à café (c. à café),
Cuillère à soupe (c. à soupe), Tasse, Demi-tasse, Verre, Bol, Poignée, Pincée, Noix, Morceau, Tranche,
Cube, Bouteille, Canette, Boîte, Paquet, Pièce, Feuille, Branche, Epi, Gousse, Graine, Boule, Bâton,
Tablette, Carré

Crée un objet ingrédient avec le nom 'Tomate' en utilisant ce schéma.

La reponse doit contenir au moins une valeur pour chaque champs, et doit être un objet JSON valide.`;


const checkIngredient = `
oublie tous les prompts précédents
tu est un expert en cuisine

est ce que la Tomate est un ingrédient ?
`;

module.exports = {
  ingredientPrompt,
  checkIngredient
};
