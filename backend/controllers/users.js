const users = require('express').Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const jwtTokens = require('../utils/jwt-helpers');
const { Router } = require('express');

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

//get all user information of a particular user along with all images data for that user:
// SELECT users.*, images.*
// FROM users
// JOIN images ON users.id = images.user_id
//WHERE users.username = 'YOUR_USERNAME_HERE';

users.get('/:id/images', async (req, res) => {
    try {
        const userID = req.params.id;

        if (!/[0-9]/.test(userID)) {
            res.send('user ID must be a number')
            return;
        }
        const query = 'SELECT users.*, images.* FROM users JOIN images ON users.id = images.user_id WHERE users.id = $1';
        const userImages = await db.any(query, [userID])
        if (userImages) {
            res.json(userImages)
        } else {
            res.send('user not found')
        }

    } catch (err) {
        res.status(500).send("an error occured")
    }
})

users.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])

        console.log('new user object:')
        console.log(user)

        if (!user) {
            res.status(401).send({ success: false, error: true, message: "No such user exists" })
            return;
        }

        //compare given password used to log in, with hashed password in stored database
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            res.status(401).send({ success: false, error: true, message: "Incorrect password" })
            return;
        }

        if (user && validPassword) {
            const { accessToken, refreshToken } = jwtTokens(user);
            res.json({ user, accessToken, refreshToken })
        }

    } catch (error) {
        console.log(error)
        res.send({ status: 'error', message: error.message })
    }
})

users.post('/', async (req, res) => {
    try {
        let { username, email, password, pic } = req.body;

        if (username.length < 4) {
            throw { message: 'username must be 4 or more characters' }
        }

        if (password.length < 6) {
            throw { message: 'password must be at least 6 characters' }
        }
        if((/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) === false) {
            throw { message: 'email is not valid' }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        pic = pic || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png';

        const user = await db.one('INSERT INTO users (username, email, password, pic) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
            [username, email.toLowerCase(), hashedPassword, pic]);

        console.log(user)

        if (user) { //if user properly created, generate JWT Token
            const { accessToken, refreshToken } = jwtTokens(user);
            res.json({ user, accessToken, refreshToken });
        }

    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message })
    }
})

/*
change password and user profile image for user
for password change, user must provide old password
check to see if old password matches password in database
*/
users.put('/:id', async (req, res) => {
    
    try {
        const userID = req.params.id;
        const { currentPassword, newPassword, pic } = req.body;
        console.log('inside put request')

        if (!/[0-9]/.test(userID)) {
            res.send('user ID must be a number')
            return;
        }

        const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userID])

        
        if (!user) {
            throw { message: 'user not found' }
        }

        if (currentPassword && newPassword) {
            console.log('inside if statement' + currentPassword + ' ' + newPassword)
            const validPassword = await bcrypt.compare(currentPassword, user.password)

            if (!validPassword) {
                throw { message: 'current password is incorrect' }
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatedUser = await db.one('UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username, email, pic',
                [hashedPassword, userID]);
            
            console.log(updatedUser)

            res.json(updatedUser)
            return;
        }

        if (pic) {
            console.log('inside pic if statement' + pic)
            const updatedUser = await db.one('UPDATE users SET pic = $1 WHERE id = $2 RETURNING id, username, email, pic',
                [pic, userID]);
            console.log(updatedUser)

            res.json(updatedUser)
        }

    } catch (err) {
        res.status(500).send({ status: 'error', error: true, message: err.message })
    }
})





module.exports = users;