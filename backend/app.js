const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

// MIDDLEWARE
app.use(express.json())

const imagesController = require('./controllers/images')
const usersController = require('./controllers/users')

// ROUTES
app.get("/", (req, res) => {
  res.send("AI ART HOME");
});

//CONTROLLERS
app.use('/images', imagesController);
app.use('/users', usersController)

module.exports = app;