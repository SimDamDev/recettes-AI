const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:`);
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

app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use(express.static('public'));