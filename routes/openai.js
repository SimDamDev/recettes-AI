const express = require('express');
const router = express.Router();
const createChatCompletion = require('../openai-utils');
const { ingredientPrompt, checkIngredient } = require('../utils/prompt.js'); 

// Constantes pour les noms de routes
const ROOT_ROUTE = '/';
const CHECK_ROUTE = '/check';

// Route pour générer une complétion de chat basée sur un nom d'ingrédient
router.post(ROOT_ROUTE, async (req, res, next) => {
  try {
    const name = req.body.name;
    const customizedPrompt = ingredientPrompt.replace('Tomate', name); 
    const completion = await createChatCompletion(customizedPrompt);
    res.json(completion);
  } catch (error) {
    next(error); 
  }
});

// Route pour vérifier un ingrédient en utilisant une complétion de chat
router.post(CHECK_ROUTE, async (req, res, next) => {
  try {
    const name = req.body.name; 
    const checkPrompt = checkIngredient.replace('Tomate', name);
    const completion = await createChatCompletion(checkPrompt);
    res.json(completion);
  } catch (error) {
    next(error); 
  }
});

module.exports = router;