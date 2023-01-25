import React, { useState, useRef } from 'react';
import './ImageCard.scss';
// import { Link } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';
import ImageCardModal from '../imageCardModal/ImageCardModal';
// import MyModal from '../MyModal';


function ImageCard({ image, width = 420, numberOfColumns}) {
  const { ai, prompt, title, url, date } = image;
  const [openCardModal, setOpenCardModal] = useState(false);
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);
  const imgObj = new Image();
  imgObj.src = image.url;

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

  // const starIcons = (avg_rating) =>{
  //   let avg = roundToOneDecimal(avg_rating);
  //   if(!avg) return 'not rated'
  //   let output;
  //   for(let i = 0; i < avg; i++){
  //     output += <StarIcon />
  //   }
  //   return output;
  // }

  //const image_rating = roundToOneDecimal(avg_rating) ? roundToOneDecimal(avg_rating) + ' / 5 🔥' : 'Not rated';

  return (
    <div>
      {/* {isOpen && <MyModal  openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} image={image} onClose={handleClose}/> } */}
      <ImageCardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} image={image} imgObj={imgObj} />
      <div className='imageCard' ref={divRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={openModalForImage} >
        {/* <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}> */}
        <img className="imageCard__image" src={url} alt="ai img" />
        <div className="imageCard__overlay" style={styles.overlay}>
          <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
          <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
          <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 80)}</p>
          <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
          {/* <p className='imageCard__overlay__rating' style={styles.rating}><CardStarRating value={Number(avg_rating)} text={"rating"} color="orange" /></p> */}
          {/* <p className='imageCard__overlay__dimensions' style={styles.ai}>Height: {height}</p> */}
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default ImageCard;