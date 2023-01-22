import React, {useState} from 'react';
import './MyModal.scss';
import { timeSince } from '../utils/dateUtils';

const MyModal = ({ openCardModal, setOpenCardModal, image, onClose }) => {
  const { ai, date, prompt, title, instructions, url } = image;
  const [style, setStyle] = useState({ display: 'block' });
  // const handleClose = () => { 
  //   console.log('closing modal');
  //   console.log('openCardModal: ', openCardModal);
  //   setOpenCardModal(false) };

  const handleClick = () => {
    console.log("displaying none")
    setStyle({ display: 'none' });
  }

  return (
        <div style={style} className="modal-overlay" onClick={handleClick}>
          <div className='imageCardBox'>
                    {title}
                <img className='imageCardBox__img' src={url} alt="modal view" />
                <div className='imageCardBox__details'>
                        {prompt}
                    <p>Made with {ai}</p>
                {instructions && <p>Instructions: {instructions}</p>}
                    <p>Created {timeSince(date)}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
  );
};

export default MyModal;