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
    let { min = 1, max = 999999999, limit = 27 } = req.query;
    limit = Number(limit)
    min = Number(min)
    max = Number(max)
    return res.json(await db.any('SELECT * FROM images WHERE id >= $1 AND id <= $2 LIMIT $3', [min, max, limit]))
})

images.get('/:id', async (req, res) => {
    try {
        const imageID = req.params.id;
        if (!/[0-9]/.test(imageID)) {
            res.send("image id is not a number")
            return;
        }
        const image = await db.oneOrNone('SELECT * FROM images where id = $1', [imageID])
        return image ? res.json(image) : res.status(422).send({success: false, error: true, message: "No image with that id"})
    } catch (error) {
        res.status(500).send('Error occured: ', error)
    }
})



module.exports = images;