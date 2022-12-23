import React from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";

function ImageCard({ image }) {
    const { id, title, url } = image;

    return (
        <div className='imageCard'>
            <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
                <img className="imageCard__image"src={url} alt="ai img" />
                <div className="imageCard__overlay">{title}</div>
            </Link>
        </div>
    );
}

export default ImageCard;