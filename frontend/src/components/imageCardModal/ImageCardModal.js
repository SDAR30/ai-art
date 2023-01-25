import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ImageCardModal.scss'
import { timeSince } from '../../utils/dateUtils';
import { apiURL } from "../../utils/apiURL"
import HoverRating from '../hoverRating/HoverRating';
import { roundToHalf } from '../../utils/mathUtils';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

function ImageCardModal({ openCardModal, setOpenCardModal, image, imgObj }) {
    const { id, ai, date, prompt, title, instructions, url, avg_rating } = image;
    const [currentAvgRating, setCurrentAvgRating] = useState(roundToHalf(avg_rating));
    const [artist, setArtist] = useState({});
    const URL = apiURL();
    const [cookies] = useCookies('token');
    const user_id = cookies.token ? cookies.user.id : 0;
    const [imageDimensions, setImageDimensions] = useState({});

    //if(url.includes('imgur')) return alert('images from this source cant be downloaded')

    useEffect(() => {
        imgObj.onload = () => {
            setImageDimensions({ width: imgObj.width, height: imgObj.height });
        }
    }, [imgObj])

    const downloadImage = () => {
        let imageURL = image.url;
        console.log('imageURL: ', imageURL)
        if (!imageURL.includes('ai-art'))
            imageURL = 'https://cors-anywhere.herokuapp.com/' + image.url;
        fetch(imageURL)
            .then(res => res.blob())
            .then(blob => {
                saveAs(blob, `${title}.png`);
            })
    }

    const submitRating = (rating) => {
        if (!user_id)
            return alert('Log in to rate images')
        console.log("submit rating ", rating)
        //setImageRating(convertRatingToPercent(rating))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: id, rating, user_id })
        }
        fetch(`${URL}/ratings`, requestOptions).then(res => res.json()).then(data => {
            //show success toast message
            setCurrentAvgRating(roundToHalf(data.rating));
            data.error ? alert('error: ' + data.message) : console.log('rating submitted, data: ', data)
        }).catch(err => {
            alert('rating failed to post to backend')
            console.log('error in submitRating in ImageView')
        })
    }


    useEffect(() => {
        const getArtist = async () => {
            const response = await fetch(`${URL}/users/${image.user_id}`);
            const data = await response.json();
            setArtist(data);
        }
        getArtist();
    }, [image.user_id, URL])

    const handleClose = () => {
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
                        <img src={artist.pic} alt='profile'></img> <div>by {artist.username}</div>
                    </div>
                    <div className='imageCardBox__prompt'><span>prompt: </span><span title='copy'>{prompt}</span></div>
                    {instructions && <div className='imageCardBox__instructions'>-- {instructions}</div>}
                    
                    <div className='imageCardBox__date' >created {timeSince(date)} using {ai}</div>

                    <div className='imageCardBox__dimensions' >
                        <div className='dimensions__download' onClick={downloadImage} ><DownloadIcon />
                            <div >Download Image</div>
                        </div>
                        <div>{imageDimensions.width} x {imageDimensions.height}</div>
                    </div>

                    

                </div>
                <div className='imageCardBox__rating'>
                    <div>Rating</div>
                    <HoverRating rating={currentAvgRating} submitRating={submitRating} />
                </div>
            </Box>
        </Modal>
    );
}

export default ImageCardModal;