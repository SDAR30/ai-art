const cors = require("cors");
const express = require('express');
const imagesController = require('./controllers/images')
const usersController = require('./controllers/users')
const accountsController = require('./controllers/accounts')
const { generateUploadURL } = require('./s3')
const { generate_DALLE_Image } = require('./dalle');

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json())

// if(process.env.NODE_ENV !== 'production'){
//   require('dotenv').config();
// }

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

app.post('/dalle', async (req, res) => {

  let {prompt, number, size} = req.body;

  const response = await generate_DALLE_Image(prompt)
  console.log('response: ', response)
  res.send(response)
  //res.send(response);
})

module.exports = app;