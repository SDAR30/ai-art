const images = require('express').Router();

const db = require('../db/index');

images.get('/authenticate', async (req, res) => {
    try {
        console.log(req.headers.authorization);
        res.send({});
    } catch (error) {
        res.send('error')
    }
})

images.get('/', async (req, res) => {
    try {
        let { min = 1, max = 9999999, limit = 27 } = req.query;
        limit = Number(limit)
        min = Number(min)
        max = Number(max)
        return res.json(await db.any('SELECT * FROM images WHERE id >= $1 AND id <= $2 LIMIT $3', [min, max, limit]))
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

//get all images of a particular user:
images.get('/user/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        if (!/[0-9]/.test(userID)) {
            res.send("user id is not a number")
            return;
        }
        const userImages = await db.any('SELECT * FROM images where user_id = $1', [userID])
        return userImages ? res.json(userImages) : res.status(422).send({ success: false, error: true, message: "No images for that user" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})


images.get('/:id', async (req, res) => {
    try {
        const imageID = req.params.id;
        if (!/[0-9]/.test(imageID)) {
            res.send("image id is not a number")
            return;
        }
        const image = await db.oneOrNone('SELECT * FROM images where id = $1', [imageID])
        return image ? res.json(image) : res.status(422).send({ success: false, error: true, message: "No image with that id" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

images.post('/', async (req, res) => {
    try {
        console.log("req obj recieved: ", req.body)
        const { title, ai, instructions, prompt, date, url, user_id } = req.body;
        if (!title || !ai || !prompt) throw new Error("missing: " + (!title ? "title" : !ai ? "ai" : !prompt ? "prompt" : "unknown"))
        if(!url || !date || !user_id) throw new Error("missing: " + (!url ? "url" : !date ? "date" : !user_id ? "user_id" : "unknown"))
        const newImage = await db.oneOrNone('INSERT INTO images (title, ai, instructions, prompt, date, url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, ai, instructions, prompt, date, url, user_id]);
        return newImage ? res.json(newImage) : res.status(422).send({ success: false, error: true, message: "failed to add image" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

module.exports = images;