const express = require('express');
const router = express.Router();
const createChatCompletion = require('../openaiUtils');
const { ingredientPrompt } = require('../prompt.js'); // importez votre modèle de prompt
const { checkIngredient } = require('../prompt.js'); // importez votre modèle de prompt

router.post('/', async (req, res) => {
  try {
    const name = req.body.name; // obtenez le nom de l'ingrédient de la requête du client
    const customizedPrompt = ingredientPrompt.replace('Tomate', name); // remplacez 'Tomate' par le nom de l'ingrédient dans le modèle de prompt
    const completion = await createChatCompletion(customizedPrompt);
    res.json(completion);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.post('/check', async (req, res) => {
  try {
    const name = req.body.name; // obtenez le nom de l'ingrédient de la requête du client
    const checkPrompt = checkIngredient.replace('Tomate', name);
    const completion = await createChatCompletion(checkPrompt);
    res.json(completion);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

module.exports = router; 