const express = require('express');
const router = express.Router();
const { createChatCompletion, createImage } = require('../openaiUtils');  // Import both functions
const { ingredientPrompt, checkIngredient, generateImage } = require('../prompt.js');  // Import your prompt models

router.post('/', async (req, res) => {
  try {
    const name = req.body.name; // Get the ingredient name from the client request
    const customizedPrompt = ingredientPrompt.replace('Tomate', name); // Replace 'Tomate' with the ingredient name in the prompt model
    const completion = await createChatCompletion(customizedPrompt);
    res.json(completion);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.post('/check', async (req, res) => {
  try {
    const name = req.body.name; // Get the ingredient name from the client request
    const checkPrompt = checkIngredient.replace('Tomate', name);
    const completion = await createChatCompletion(checkPrompt);
    res.json(completion);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.post('/image', async (req, res) => {  // New image route
  try {
    const name = req.body.name; // Get the name from the client request
    const imagePrompt = generateImage.replace('Tomate', name);  // Replace 'Tomate' with the ingredient name in the image prompt
    const imageUrls = await createImage(imagePrompt);  // Generate images based on the customized prompt
    res.json({imageUrls: imageUrls});  // Return the array of image URLs
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});


module.exports = router;
