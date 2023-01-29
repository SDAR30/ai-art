import React, { useState, useEffect, useRef } from 'react';
import './ImageCard.scss';
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';
import { ratingText } from '../../utils/mathUtils';
import ImageCardModal from '../imageCardModal/ImageCardModal';

function ImageCard({ image, width = 420, numberOfColumns, findNextImage }) {
  const { ai, prompt, title, url, date, avg_rating} = image;
  const [newImage, setNewImage] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    const imgObj = new Image();
    imgObj.src = image.url;
    imgObj.onload = () => {
      setImageDimensions({ width: imgObj.width, height: imgObj.height });
    }
  }, [image.url, image])


  const showNextImage = (image, goForward, resetImage = false) => {
    if (resetImage) {
      setNewImage(false);
      return;
    }
    let nextImage = findNextImage(image, goForward);
    setNewImage(nextImage);
    //get dimensions of next image
    const imgObj = new Image();
    imgObj.src = nextImage.url;
    imgObj.onload = () => {
      setImageDimensions({ width: imgObj.width, height: imgObj.height });
    }
  }

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

  return (
    <div>
      <ImageCardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} image={newImage || image} imageDimensions={imageDimensions} findNextImage={findNextImage} showNextImage={showNextImage} />
      <div className='imageCard' ref={divRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={openModalForImage} >
        {/* <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}> */}
        <img className="imageCard__image" src={url} alt="ai img" />
        <div className="imageCard__overlay" style={styles.overlay}>
          <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
          <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
          <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 80)}</p>
          <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
          <p className='imageCard__overlay__rating' style={styles.rating}>{ratingText(avg_rating)}</p>
          {/* <p className='imageCard__overlay__dimensions' style={styles.ai}>Height: {height}</p> */}
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default ImageCard;