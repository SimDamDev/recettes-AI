const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

// Constante pour le modèle OpenAI
const OPENAI_MODEL = "gpt-3.5-turbo";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_FROM_ENV,
});
const openai = new OpenAIApi(configuration);

/**
 * Crée une complétion de chat en utilisant l'API OpenAI
 * @param {string} prompt - Le prompt à utiliser pour la complétion
 * @return {Promise<string>} Le message de complétion
 */
async function createChatCompletion(prompt) {
  try {
    const completion = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      messages: [{role:"user", content: prompt}],
    });

    return completion.data.choices[0].message; // retourner le message au lieu de le loguer
  } catch (error) {
    console.error("Erreur lors de la création de la complétion du chat : ", error);
    throw error;
  }
}

module.exports = createChatCompletion;