const express = require('express');

//initialize app
const app = express();

const imagesController = require('./controllers/images')

// ROUTES
app.get("/", (req, res) => {
  res.send("AI ART HOME");
});

//CONTROLLERS
app.use('/images', imagesController);

module.exports = app;