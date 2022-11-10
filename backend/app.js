const express = require('express');

//initialize app
const app = express();


// ROUTES
app.get("/", (req, res) => {
    res.send("AI ART HOME");
  });

module.exports = app;