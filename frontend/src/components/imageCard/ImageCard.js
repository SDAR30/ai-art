import React, { useState, useRef } from 'react';
import './ImageCard.scss';
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';
import { ratingText } from '../../utils/mathUtils';
import ImageCardModal from '../imageCardModal/ImageCardModal';

function ImageCard({ image, width = 420, numberOfColumns, images }) {
  const { ai, prompt, title, url, date, avg_rating} = image;
  const [openCardModal, setOpenCardModal] = useState(false);
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);


  const openModalForImage = () => {
    setOpenCardModal(true);
  }

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
      fontSize: widthPerImage / 23,
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

  return (
    <div>
      <ImageCardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} startingIndex={images.findIndex(element => element.id === image.id)} images={images} />
      <div className='imageCard' ref={divRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={openModalForImage} >
        <img className="imageCard__image" src={url} alt="ai img" />
        <div className="imageCard__overlay" >
          <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
          <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
          <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 90)}</p>
          <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
          <p className='imageCard__overlay__rating' style={styles.rating}>{ratingText(avg_rating)}</p>
          {/* <p className='imageCard__overlay__dimensions' style={styles.ai}>W: {widthPerImage}</p> */}
        </div>
      </div>
    </div>
  );
}

export default ImageCard;