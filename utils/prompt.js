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

/**
 * const ingredientPrompt = `Crée un objet ingrédient avec le nom 'Tomate' en utilisant le schéma ci-dessous. La réponse doit être un objet JSON valide contenant au moins une valeur pour chaque champ.

Schéma de l'ingrédient :
{
  "name": String,       // Nom de l'ingrédient, requis
  "pluralName": String, // Nom au pluriel de l'ingrédient, requis
  "units": [String],    // Unités de mesure pour cet ingrédient, requis
  "image": String       // URL de l'image de l'ingrédient, optionnel
}

Pour les unités, choisis parmi les suivantes :
Gramme (g), Kilogramme (kg), Milligramme (mg), Litre (l), Millilitre (ml), Cuillère à café (c. à café),
Cuillère à soupe (c. à soupe), Tasse, Demi-tasse, Verre, Bol, Poignée, Pincée, Noix, Morceau, Tranche,
Cube, Bouteille, Canette, Boîte, Paquet, Pièce, Feuille, Branche, Epi, Gousse, Graine, Boule, Bâton,
Tablette, Carré

Exemple de réponse :
{
  "name": "Tomate",
  "pluralName": "Tomates",
  "units": ["Pièce", "Tranche", "Bol"],
  "image": "http://example.com/images/tomate.jpg"
}`;
 * 
 */


const checkIngredient = `
oublie tous les prompts précédents
tu est un expert en cuisine

est ce que la Tomate est un ingrédient ?
`;

//Par exemple, pour checkIngredient, vous pourriez dire :
// "En tant qu'expert en cuisine, peux-tu me dire si la tomate
// est considérée comme un ingrédient ?"

module.exports = {
  ingredientPrompt,
  checkIngredient
};
