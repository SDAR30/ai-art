const images = require('express').Router();

images.get('/', (req, res) => {
    res.json({ success: false, error: true, message: "invalid id" })
})

images.get('/:id', (req, res) => {
    try {
        const imageID = req.params.id;
        if (!/[0-9]/.test(imageID)) {
            res.send("image id is not a number")
            return;
        }
        res.json({})
    } catch (error) {
        res.status(500).send('Error occured: ', error)
    }
})


module.exports = images;