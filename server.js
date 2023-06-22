const express = require('express');
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
