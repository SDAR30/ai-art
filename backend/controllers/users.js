const users = require('express').Router();

users.get('/', (req, res) => {
    res.json({ success: true, error: false, message: "get all students", 
        users: [{name: 'Adam Z', email: 'adam01@gmail.com', password: '0zxv33'}, {name: 'Brian J', email: 'bbjame@gmail.com', password: 'ki1293'}] })
})

users.get('/:id', async (req, res) => {
    try {
        const userID = req.params.id;

        if (!/[0-9]/.test(userID)) {
            res.send('User ID must be a number')
            return;
        }
        const singleUser = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userID])
        if (singleUser) {
            res.json(singleUser)
        } else {
            res.send('student not found')
        }
    } catch (err) {
        res.status(500).send("aN error occured")
    }
})


module.exports = users;