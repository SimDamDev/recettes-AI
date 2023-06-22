const express = require('express');
const { ChatGPTAPI } = require('chatgpt');
const { initChatGPT, askQuestion } = require('./your-module-name.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients'); // Ajoutez cette ligne

app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes); // Ajoutez cette ligne
app.use(express.static('public'));

// Call the initChatGPT function to initialize the chatbot API
initChatGPT();

// Use the askQuestion function to send a message to the chatbot API and get a response
app.get('/api/gpt', async (req, res) => {
  const question = req.query.question;
  askQuestion(question, (response) => {
    res.send(response);
  });
});