import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ImageCardModal.scss'
import { timeSince } from '../../utils/dateUtils';
import { apiURL } from "../../utils/apiURL"
import HoverRating from '../hoverRating/HoverRating';
import { roundToHalf } from '../../utils/mathUtils';

function ImageCardModal({ openCardModal, setOpenCardModal, image }) {
    const { ai, date, prompt, title, instructions, url, avg_rating } = image;
    const [artist, setArtist] = useState({});
    const API = apiURL();


    useEffect(() => {
        const getArtist = async () => {
            const response = await fetch(`${API}/users/${image.user_id}`);
            const data = await response.json();
            setArtist(data);
        }
        getArtist();
    }, [image.user_id, API])

    const handleClose = () => {
        console.log('closing modal');
        setOpenCardModal(false);
    }

    return (
        <Modal
            className='imageCardModal'
            open={openCardModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box className='imageCardBox'>
                <h2 className='imageCardBox__title'> {title} </h2>
                <img className='imageCardBox__img' src={url} alt="modal view" />
                <div className='imageCardBox__details'>
                    <div className='imageCardBox__artist'>
                        <img src={artist.pic} alt='profile'></img> <p>by {artist.username}</p>
                    </div>
                    <p>Prompt: {prompt}</p>
                    {instructions && <p>Instructions: {instructions}</p>}
                    <p>Created {timeSince(date)} using {ai}</p>
                </div>
                <div className='imageCardBox__rating'><p>Rating: {roundToHalf(avg_rating)}</p><HoverRating rating={roundToHalf(avg_rating)}/></div>
            </Box>
        </Modal>
    );
}

export default ImageCardModal;