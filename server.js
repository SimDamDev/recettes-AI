const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const gptRoutes = require('./routes/gpt');

app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/gpt', gptRoutes); // Utilisez le routeur gpt pour les requêtes à '/api/gpt'
app.use(express.static('public'));
