const express = require('express');
const Ingredient = require('../models/Ingredient');
const { validateIngredient } = require('../utils/validator.js'); // importez votre fonction de validation

const router = express.Router();

// ...

router.post('/', validateIngredient, async (req, res, next) => {
  const { name, pluralName, quantity, unit, image } = req.body; // destructuring

  const ingredient = new Ingredient({
    name,
    pluralName,
    quantity,
    unit,
    image,
  });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err); 
  }
});

module.exports = router;
