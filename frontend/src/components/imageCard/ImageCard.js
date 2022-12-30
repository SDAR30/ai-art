import React from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';

function ImageCard({ image, width, numberOfColumns }) {
    const { id, ai, prompt, title, url, date } = image;
    let widthPerImage = width ? width / numberOfColumns : 52;
    const styles = {
      title: {
        fontSize: widthPerImage/25.5,
        color: '#ff6b0f'
      },
      date: {
        fontSize: widthPerImage/31,
        marginTop: '3px',
        color: 'grey'
      },
      prompt: {
        fontSize: widthPerImage/28,
      },
      ai: {
        fontSize: widthPerImage/30
      }
    }

    return (
        <div className='imageCard' >
            <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
                <img className="imageCard__image" src={url} alt="ai img" />
                <div className="imageCard__overlay"  >
                    <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
                    <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
                    <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 80)}</p>
                    <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
                    <p className='imageCard__overlay__dimensions' style={styles.ai}>{width} : {widthPerImage}</p>
                </div>
            </Link>
        </div>
    );
}

export default ImageCard;