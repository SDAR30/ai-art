import React from 'react';
import './StarRating.scss';

function StarRating({ imageID, imageRating, submitRating }) {
    return (
        <div>
            Star Rating for image {imageID} : {imageRating}
            <div onClick={submitRating} className="stars rate" data-percent={imageRating}>
                <a href="?1" value='1' title="awful">★</a>
                <a href="?2" value='2' title="ok">★</a>
                <a href="?3"  title="good">★</a>
                <a href="?4"  title="great">★</a>
                <a href="?5" value='5' title="awesome">★</a>
            </div>
        </div>
    );
}

export default StarRating;