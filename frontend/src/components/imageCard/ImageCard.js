import React, { useState, useRef } from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';
import { roundToOneDecimal } from '../../utils/mathUtils';

function ImageCard({ image, width = 420, numberOfColumns }) {
  const { id, ai, prompt, title, url, date, avg_rating } = image;
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  const handleMouseEnter = () => {
    setHeight(divRef.current.clientHeight);
  }

  const handleMouseLeave = () => {
    setHeight(0);
  }

  let widthPerImage = width / numberOfColumns;
  widthPerImage = widthPerImage > 420 ? 420 : widthPerImage;
  const styles = {
    title: {
      fontSize: widthPerImage / 25.5,
      color: '#ff6b0f'
    },
    date: {
      fontSize: widthPerImage / 31,
      marginTop: '3px',
      color: 'grey'
    },
    prompt: {
      fontSize: widthPerImage / 28,
    },
    ai: {
      fontSize: widthPerImage / 30
    },
    rating: {
      fontSize: widthPerImage / 30
    },
    overlay: {
      height: height > 300 ? ((height * .25) + 'px') : (height * .35) + 'px',
    }
  }

  const image_rating = roundToOneDecimal(avg_rating) ? roundToOneDecimal(avg_rating) + ' / 5.0' : 'Not rated';

  return (
    <div className='imageCard' ref={divRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
        <img className="imageCard__image" src={url} alt="ai img" />
        <div className="imageCard__overlay" style={styles.overlay}>
          <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
          <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
          <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 80)}</p>
          <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
          <p className='imageCard__overlay__rating' style={styles.rating}>{image_rating}</p>
          {/* <p className='imageCard__overlay__dimensions' style={styles.ai}>Height: {height}</p> */}
        </div>
      </Link>
    </div>
  );
}

export default ImageCard;