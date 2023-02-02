const bookmarks = require('express').Router();
const db = require('../db/index');

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

module.exports = bookmarks;