const express = require('express');
const Recipe = require('../models/Recipe');


const router = express.Router();


 // Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 // Get one recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});
 // Create one recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    recipeImage: req.body.recipeImage,
    preparationTime: req.body.preparationTime,
    cookingTime: req.body.cookingTime,
    difficulty: req.body.difficulty,
    price: req.body.price,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    preparationInstructions: req.body.preparationInstructions,
    cookingInstructions: req.body.cookingInstructions,
    servingInstructions: req.body.servingInstructions,
  });
   try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 // Update one recipe
router.patch('/:id', getRecipe, async (req, res) => {
  if (req.body.title != null) {
    res.recipe.title = req.body.title;
  }
  if (req.body.recipeImage != null) {
    res.recipe.recipeImage = req.body.recipeImage;
  }
  if (req.body.difficulty != null) {
    res.recipe.difficulty = req.body.difficulty;
  }
  if (req.body.price != null) {
    res.recipe.price = req.body.price;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.preparationInstructions != null) {
    res.recipe.preparationInstructions = req.body.preparationInstructions;
  }
  if (req.body.cookingInstructions != null) {
    res.recipe.cookingInstructions = req.body.cookingInstructions;
  }
  if (req.body.servingInstructions != null) {
    res.recipe.servingInstructions = req.body.servingInstructions;
  }
   try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 // Delete one recipe
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Deleted Recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 // Middleware function for get by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id).populate('ingredients');
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
   res.recipe = recipe;
  next();
}

module.exports = router;
