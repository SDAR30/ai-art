const users = require('express').Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const jwtTokens = require('../utils/jwt-helpers');

users.get('/', async (req, res) => res.json(await db.any('SELECT * FROM users')))

users.get('/:id', async (req, res) => {
    try {
        const userID = req.params.id;

        if (!/[0-9]/.test(userID)) {
            res.send('user ID must be a number')
            return;
        }
        const singleUser = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userID])
        if (singleUser) {
            res.json(singleUser)
        } else {
            res.send('user not found')
        }
    } catch (err) {
        res.status(500).send("an error occured")
    }
})

users.post('/', async (req, res) => {
    try {
        let { username, email, password, pic } = req.body;

        if (username.length < 4) {
            throw { message: 'username must be 4 or more characters' }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        pic = pic || 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'

        const user = await db.oneOrNone('INSERT INTO users (username, email, password, pic) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
            [username, email.toLowerCase(), hashedPassword, pic]);

        if(user){ //if user properly created, generate JWT Token
            let data = jwtTokens(user); //data constains {refreshtoken, accesstoken}
            res.json(data);
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = users;