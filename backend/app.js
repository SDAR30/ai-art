const express = require('express');
const cors = require("cors");
const { generateUploadURL } = require('./s3')

const app = express();

app.use(cors());

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

// MIDDLEWARE
app.use(express.json())

const imagesController = require('./controllers/images')
const usersController = require('./controllers/users')
const accountsController = require('./controllers/accounts')

// ROUTES
app.get("/", (req, res) => {
  res.send("AI ART HOME");
});

//CONTROLLERS
app.use('/images', imagesController);
app.use('/users', usersController);
app.use('/accounts', accountsController);

//AWS s3 URL route
app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({ url })
})

module.exports = app;