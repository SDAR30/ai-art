const ratings = require('express').Router();

// const ratings = require('express').Router({
//     mergeParams: true
// });

const db = require('../db/index');

//get all ratings
ratings.get('/', async (req, res) => res.json(await db.any('SELECT * FROM ratings')))

/*
SELECT images.id, images.name, ROUND(AVG(ratings.rating), 2) as avg_rating
FROM images
LEFT JOIN ratings ON images.id = ratings.image_id
GROUP BY images.id;
*/
ratings.get('/average', async (req, res) => {
    const query = `SELECT images.id, images.title, ROUND(AVG(ratings.rating), 1) as avg_rating
FROM images LEFT JOIN ratings ON images.id = ratings.image_id GROUP BY images.id;`;
    try {
        return res.json(await db.query(query))
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

/*get the average rating of every image along with all the image data
SELECT images.*, COALESCE(AVG(ratings.rating),0) as avg_rating
FROM images
LEFT JOIN ratings ON images.id = ratings.image_id
GROUP BY images.id;
*/
ratings.get('/average/all', async (req, res) => {
    const query = `SELECT images.*, COALESCE(AVG(ratings.rating),0) as avg_rating FROM images LEFT JOIN ratings ON images.id = ratings.image_id GROUP BY images.id;`;
    try {
        return res.json(await db.query (query))
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

//get average rating of one specific image, or return 0 if no rating or image
ratings.get('/:id', async (req, res) => {
    const imageID = req.params.id;
    if (!/[0-9]/.test(imageID)) {
        res.send("image id is not a number")
        return;
    }
    const image = await db.oneOrNone('SELECT COALESCE(AVG(ratings.rating), 0) as avg_rating FROM ratings WHERE image_id = $1', [imageID])
    console.log(image)
    return image ? res.json(image) : res.status(422).send({ success: false, error: true, message: "No image with that id" })
})


//post rating for an image
ratings.post('/', async (req, res) => {
    const { image_id, user_id, rating } = req.body;
    if (!/[0-9]/.test(image_id) || !/[0-9]/.test(user_id) || !/[0-9]/.test(rating)) {
        res.send("image id, user id, or rating is not a number")
        return;
    }
    try {
        //make sure this user hasn't already rated this image
        const queryCheck = `SELECT * FROM ratings WHERE image_id = $1 AND user_id = $2`;
        const valuesCheck = [image_id, user_id];
        const ratingExists = await db.oneOrNone(queryCheck, valuesCheck);
        console.log(ratingExists)
        if (ratingExists) {
            //if rating exists, update it
            const queryUpdate = `UPDATE ratings SET rating = $1 WHERE image_id = $2 AND user_id = $3 RETURNING *`;
            const valuesUpdate = [rating, image_id, user_id];
            const updatedRating = await db.one(queryUpdate, valuesUpdate);
            return res.json(updatedRating);
        }
        //if rating doesn't exist, create it
        const query = `INSERT INTO ratings (image_id, user_id, rating) VALUES ($1, $2, $3) RETURNING *`;
        const values = [image_id, user_id, rating];
        const newRating = await db.one(query, values);
        return res.json(newRating);
    } catch (error) {
        console.log('inside ratings.post catch: ', error.message)
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

module.exports = ratings;
