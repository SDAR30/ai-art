const bookmarks = require('express').Router();
const db = require('../db/index');


//check how many users have bookmarked images from an artist
/*
SELECT COUNT(DISTINCT user_id) FROM bookmarks
JOIN images ON bookmarks.image_id = images.id
WHERE images.artist_id = [artist_id];
*/
bookmarks.get('/artist/:artist_id', async (req, res) => {
    const artistID = req.params.artist_id;
    if (!/[0-9]/.test(artistID)) {
        res.send("artist id is not a number")
        return;
    }
    const query = 'SELECT COUNT(DISTINCT bookmarks.user_id) FROM bookmarks JOIN images ON bookmarks.image_id = images.id WHERE images.user_id = $1';
    const bookmarkCount = await db.oneOrNone(query, [artistID]);
    return res.json(bookmarkCount)
})

//check if a user has bookmarked an image
/*
SELECT * FROM bookmarks
WHERE user_id = [user_id] AND image_id = [image_id];
*/
bookmarks.get('/:user_id/:image_id', async (req, res) => {
    const userID = req.params.user_id;
    const imageID = req.params.image_id;
    if (!/[0-9]/.test(userID) || !/[0-9]/.test(imageID)) {
        res.send("user id or image id is not a number")
        return;
    }
    const query = 'SELECT * FROM bookmarks WHERE user_id = $1 AND image_id = $2';
    const bookmark = await db.oneOrNone(query, [userID, imageID]);
    return res.json(bookmark) //will return null if no bookmark exists
})


//get all images bookmarked by  a user
/*
SELECT images.*
FROM images
JOIN bookmarks ON images.id = bookmarks.image_id
WHERE bookmarks.user_id = [user_id];
*/
bookmarks.get('/:id', async (req, res) => {
    const userID = req.params.id;
    if (!/[0-9]/.test(userID)) {
        res.send("user id is not a number")
        return;
    }
    const query = 'SELECT images.* FROM images JOIN bookmarks ON images.id = bookmarks.image_id WHERE bookmarks.user_id = $1'

    const bookmarks = await db.any(query, [userID])
    return bookmarks ? res.json(bookmarks) : res.status(422).send({ success: false, error: true, message: "No bookmarks for that user" })

})

//toggle a bookmark for an image
bookmarks.post('/', async (req, res) => {
    const { image_id, user_id } = req.body;
    if (!/[0-9]/.test(image_id) || !/[0-9]/.test(user_id)) {
        res.send("image id or user id is not a number");
        return;
    }
    console.log("checking bookmark for image_id: ", image_id, " and user_id: ", user_id);
    //make sure the user hasn't already bookmarked this image
    const queryCheck = 'SELECT * FROM bookmarks WHERE image_id = $1 AND user_id = $2';
    const bookmarkExists = await db.oneOrNone(queryCheck, [image_id, user_id]);
    if (bookmarkExists) {
        // if user has already bookmarked it, remove the bookmark
        console.log('bookmark exists, removing bookmark');
        const queryDelete = 'DELETE FROM bookmarks WHERE image_id = $1 AND user_id = $2';
        await db.none(queryDelete, [image_id, user_id]);
        return res.json({ success: true, message: "Bookmark removed" })
    } else {
        // if user has not already bookmarked it, add the bookmark
        console.log('bookmark does not exist, adding bookmark');
        const queryAdd = 'INSERT INTO bookmarks (image_id, user_id) VALUES ($1, $2) RETURNING *';
        const bookmark = await db.oneOrNone(queryAdd, [image_id, user_id]);
        return bookmark ? res.json(bookmark) : res.status(422).send({ success: false, error: true, message: "Could not add bookmark" })
        
    }
})

module.exports = bookmarks;