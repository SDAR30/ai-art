const follows = require('express').Router();
const db = require('../db/index');

//get all users that a user is following
/*
SELECT * FROM follows
WHERE following_id = [following_id];
*/
follows.get('/following/:following_id', async (req, res) => {
    try {
        const { following_id } = req.params;
        const follows = await db.any('SELECT followed_id FROM follows WHERE following_id = $1', [following_id]);
        return follows ? res.json(follows) : res.status(422).send({ success: false, error: true, message: "No follows with that id" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

//get all users that are following a user
/*
SELECT * FROM follows
WHERE followed_id = [followed_id];
*/
follows.get('/followed/:followed_id', async (req, res) => {
    try {
        const { followed_id } = req.params;
        const follows = await db.any('SELECT following_id FROM follows WHERE followed_id = $1', [followed_id]);
        return follows ? res.json(follows) : res.status(422).send({ success: false, error: true, message: "No follows with that id" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

//check if a user is following another user
/*
SELECT * FROM follows
WHERE following_id = [following_id] AND followed_id = [followed_id];
*/
follows.get('/:following_id/:followed_id', async (req, res) => {
    try {
        const { following_id, followed_id } = req.params;
        const follow = await db.oneOrNone('SELECT * FROM follows WHERE following_id = $1 AND followed_id = $2', [following_id, followed_id]);
        return res.json(follow);
        //return follow ? res.status(422).send({ success: true, error: false }) : res.status(422).send({ success: false, error: true, message: "No follow with that id" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

//toggle follow for a user
/*
INSERT INTO follows (following_id, followed_id)
VALUES ([following_id], [followed_id]);
*/
follows.post('/', async (req, res) => {
    try {
        //check if the follow already exists
        // const { following_id, followed_id } = req.params;
        const {user_id, artist_id} = req.body;
        console.log('inside follows post')
        console.log(req.body)
        const follow = await db.oneOrNone('SELECT * FROM follows WHERE following_id = $1 AND followed_id = $2', [user_id, artist_id]);
        if (follow) {
            // if follow exists, remove the follow
            console.log('already following, removing follow')
            await db.none('DELETE FROM follows WHERE following_id = $1 AND followed_id = $2', [user_id, artist_id]);
            return res.status(200).send({ success: true, error: false });
        } else {
            // if follow does not exist, add the follow
            console.log('not following, adding follow')
            await db.none('INSERT INTO follows (following_id, followed_id) VALUES ($1, $2)', [user_id, artist_id]);
            return res.status(200).send({ success: true, error: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})


module.exports = follows;