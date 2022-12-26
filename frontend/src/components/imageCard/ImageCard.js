import React from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";
import ReactFitText from 'react-fittext';
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';

function ImageCard({ image }) {
    const { id, ai, prompt, title, url, date } = image;

    return (
        <div className='imageCard'>
            <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
                <img className="imageCard__image" src={url} alt="ai img" />
                <div className="imageCard__overlay">
                    <ReactFitText compressor={1.5}>
                        <p className='imageCard__overlay__title'>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 30))}</p>
                    </ReactFitText>
                    <ReactFitText compressor={.66}>
                        <p className='imageCard__overlay__date'>{timeSince(date)}</p>
                    </ReactFitText>
                    <ReactFitText compressor={2}>
                        <p className='imageCard__overlay__prompt'>{removeExtraWords(prompt, 80)}</p>
                    </ReactFitText>
                    <ReactFitText compressor={2}>
                        <p className='imageCard__overlay__ai'>made with {ai}</p>
                    </ReactFitText>
                </div>
            </Link>
        </div>
    );
}

export default ImageCard;