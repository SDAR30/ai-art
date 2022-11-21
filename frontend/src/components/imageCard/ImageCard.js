import React from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";

function ImageCard({ image }) {
    const { id, title, ai, url } = image;

    return (
        <div className='imageCard'>
            <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
                <div className='imageCard__title'>{`Title: ${title}`}</div>
                {`ID: ${id} AI: ${ai}`}
                <div className='imageCard__imageDiv'>
                    <img src={url} alt="ai img" />
                </div>
            </Link>
        </div>
    );
}

export default ImageCard;