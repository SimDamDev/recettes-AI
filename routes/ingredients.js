const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// ...

router.post('/', async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    pluralName: req.body.pluralName,
    quantity: req.body.quantity,
    unit: req.body.unit,
    image: req.body.image,
  });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
