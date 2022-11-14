const users = require('express').Router();

const db = require('../db/index');

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


module.exports = users;