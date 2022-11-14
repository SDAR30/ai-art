import React from 'react';
import './ImageCard.scss'

function ImageCard({image}) {
    const {id, title, ai, url} = image;

    return (
        <div className='imageCard'>
            <div className='imageCard__title'>{`Title: ${title}`}</div>
            {`ID: ${id} AI: ${ai}`}
            <div className='imageCard__image'>
            <img src={url} alt="ai img"/>
            </div>
        </div>
    );
}

export default ImageCard;