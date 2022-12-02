const accounts = require('express').Router();

const authenticateToken = require('../middleware/authorization');

accounts.get('/',  authenticateToken, (req, res) => {

    res.json([
        {
            'time' : '1128:13300', 
            'rating' : '10'
        },
        {
            'time' : '43234353234', 
            'rating' : '9'
        }
    ])
})


module.exports = accounts;