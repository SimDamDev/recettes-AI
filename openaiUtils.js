const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_FROM_ENV,
});
const openai = new OpenAIApi(configuration);

async function createChatCompletion(prompt) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role:"user", content: prompt}],
  });

  return completion.data.choices[0].message; // retourner le message au lieu de le loguer
}

async function createImage(prompt) {
  const imageResponse = await openai.createImage({
    prompt: prompt,
    n: 4,
    size: "1024x1024",
  });

  // Collect all image URLs
  const imageUrls = imageResponse.data.data.map(image => image.url);
  
  return imageUrls; // return the array of image URLs
}


module.exports = { createChatCompletion, createImage };

