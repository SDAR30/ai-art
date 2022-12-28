import React, { useRef  } from 'react';
import './ImageCard.scss';
import { Link } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord, removeExtraWords } from '../../utils/stringUtils';
import { timeSince } from '../../utils/dateUtils';
import GetElementDimension from '../../utils/GetElementDimension';

function ImageCard({ image }) {
    const ref = useRef();
    const {width, height} = GetElementDimension(ref);
    const { id, ai, prompt, title, url, date } = image;
    const styles = {
      title: {
        fontSize: width ? width/22.8: 10,
        color: '#ff6b0f'
      },
      date: {
        fontSize: width ? width/26: 10,
        marginTop: '3px',
        color: 'grey'
      },
      prompt: {
        fontSize: width ? width/23: 10,
      },
      ai: {
        fontSize: width ? width/26: 10
      }
    }


    return (
        <div className='imageCard' >
            <Link className='imageCard__link' to={`/images/${id}`} state={{ image: image }}>
                <img className="imageCard__image" src={url} alt="ai img" />
                <div className="imageCard__overlay" ref={ref} >
                    <p className='imageCard__overlay__title' style={styles.title}>{capitalizeFirstLetterOfEachWord(removeExtraWords(title, 28))}</p>
                    <p className='imageCard__overlay__date' style={styles.date}>{timeSince(date)}</p>
                    <p className='imageCard__overlay__prompt' style={styles.prompt}>{removeExtraWords(prompt, 80)}</p>
                    <p className='imageCard__overlay__ai' style={styles.ai}>made with {ai}</p>
                    <p className='imageCard__overlay__dimensions' style={styles.ai}>{width} : {height}</p>
                </div>
            </Link>
        </div>
    );
}

export default ImageCard;