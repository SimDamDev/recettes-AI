const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const openaiRoutes = require('./routes/openai');
const config = require('./config/config');

const app = express();

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });


app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/openai', openaiRoutes);
app.use(express.static('public'));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});