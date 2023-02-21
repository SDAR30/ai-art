import React, { useState, useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';
import './ImageCardModal.scss'

import Notification from '../notifcation/Notification';
import HoverRating from '../hoverRating/HoverRating';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';

import { useCookies } from 'react-cookie';
import { apiURL } from "../../utils/apiURL";
import { NavLink } from 'react-router-dom';
import { timeSince } from '../../utils/dateUtils';
import { roundToHalf } from '../../utils/mathUtils';

function ImageCardModal({ openCardModal, setOpenCardModal, startingIndex, images }) {

    const [currentIndex, setCurrentIndex] = useState(startingIndex);
    const [expanded, setExpanded] = useState(false);
    const [artist, setArtist] = useState({});
    const [bookmark, setBookmark] = useState(false);
    const [following, setFollowing] = useState(false);
    const [rating, setRating] = useState(0);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const URL = apiURL();

    const [cookies] = useCookies('token');
    const user_id = cookies.token ? cookies.user.id : 0;
    const textRef = useRef(null);

    const [alertMessage, setAlertMessage] = useState('');
    const [alert, setAlert] = useState(false);

    const toggleImageSize = () => {
        setExpanded(!expanded);
    }

    const nextImageModal = () => {
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const previousImageModal = () => {
        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const copyText = () => {
        const text = textRef.current.textContent;
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        setAlertMessage("Text copied to clipboard!");
        setAlert(true);
    }

    const download = e => {
        let imageURL = images[currentIndex].url;
        if (!imageURL.includes('ai-art'))
            imageURL = 'https://cors-anywhere.herokuapp.com/' + images[currentIndex].url;
        fetch(imageURL, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const submitRating = (rating) => {
        if (!user_id) {
            setAlertMessage('log in to rate images');
            setAlert(true);
            return;
        }
        console.log("submit rating ", rating)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: images[currentIndex].id, rating, user_id })
        }
        fetch(`${URL}/ratings`, requestOptions).then(res => res.json()).then(data => {
            setAlertMessage('rating submitted');
            setAlert(true);
            setRating(roundToHalf(data.rating));
            data.error ? alert('error: ' + data.message) : console.log('rating submitted, data: ', data)
        }).catch(err => {
            setAlertMessage('rating failed to post to backend');
            setAlert(true);
            console.log('error in submitRating in ProfileImageCardModal: ', err)
        })
    }

    useEffect(() => {
        const getArtist = async () => {
            const response = await fetch(`${URL}/users/${images[currentIndex].user_id}`);
            const data = await response.json();
            setArtist(data);
        }

        const isBookmarked = async () => {
            if (!user_id) return; //if user is not logged in, return
            const response = await fetch(`${URL}/bookmarks/${user_id}/${images[currentIndex].id}`);
            const data = await response.json();
            if (data) { setBookmark(true); }
            else { setBookmark(false); }
            return;
        }

        const isFollowing = async () => {
            if (!user_id) return; //if user is not logged in, return
            const response = await fetch(`${URL}/follows/${user_id}/${images[currentIndex].user_id}`);
            const data = await response.json();
            if(data) { setFollowing(true); }
            else { setFollowing(false); }
            return;
        }

        const getRating = async () => {
            const response = await fetch(`${URL}/ratings/${images[currentIndex].id}`);
            const data = await response.json();
            setRating(roundToHalf(data.avg_rating) || 2.5); //if no rating, set to 2.5
        }

        const imgObj = new Image();
        if (!images[currentIndex]) return; //if images is empty during search, return
        imgObj.src = images[currentIndex].url;
        imgObj.onload = () => {
            setImageDimensions({ width: imgObj.width, height: imgObj.height });
        }

        isBookmarked();
        isFollowing();
        getArtist();
        getRating();

    }, [currentIndex, URL, user_id, images])

    const toggleBookmark = async () => {
        if (!user_id) {
            setAlertMessage('log in to save bookmarks');
            setAlert(true);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: images[currentIndex].id, user_id: user_id })
        }
        const response = await fetch(`${URL}/bookmarks`, requestOptions);
        const data = await response.json();
        if (data.error) {
            setAlertMessage('error: ' + data.message);
            setAlert(true);
        }
        else {
            setBookmark(!bookmark);
        }
    }

    const toggleFollow = async () => {
        if (!user_id) {
            setAlertMessage('log in to follow artists');
            setAlert(true);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id, artist_id: images[currentIndex].user_id })
        }
        const response = await fetch(`${URL}/follows`, requestOptions);
        const data = await response.json();
        if (data.error) {
            setAlertMessage('error: ' + data.message);
            setAlert(true);
        }
        else {
            setFollowing(!following);
        }
    }


    const handleClose = (e) => {
        e.stopPropagation();
        setCurrentIndex(startingIndex);
        setOpenCardModal(false);
    }

    return (
        <Modal
            className='imageCardModal'
            open={openCardModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div>
                <Notification alert={alert} setAlert={setAlert} message={alertMessage} severity='info' />
                <div className='imageCardModal__navigation'>
                    <Tooltip title="previous image"><NavigateBeforeIcon className='imageCardModal__prev' onClick={previousImageModal} fontSize='large' /></Tooltip>
                    <Tooltip title="close image"><CloseIcon className='imageCardModal__close' onClick={handleClose} fontSize='large' /></Tooltip>
                    <Tooltip title="next image"><NavigateNextIcon className='imageCardModal__next' onClick={nextImageModal} fontSize='large' /></Tooltip>
                </div>
                <div className='imageCardBox'>

                    <div className='imageCardBox__image'>
                        <Tooltip title="expand image"><FullscreenIcon className='imageCardBox__image__fullscreen' onClick={toggleImageSize} /></Tooltip>

                        <img className={expanded ? 'imageCardBox__image__img-expanded imageCardBox__image__img' : 'imageCardBox__image__img'} onClick={toggleImageSize} src={images[currentIndex]?.url} alt="modal view" />
                    </div>

                    <div className='imageCardBox__details'>

                        <div className='imageCardBox__details__header'>
                            <h2 className='imageCardBox__details__header__title'> {images[currentIndex]?.title} </h2>
                            <NavLink className='imageCardBox__details__header__artist' to={`/profile/${artist.id}`}>

                                <img src={artist.pic} alt='profile'></img>
                                <div>by {artist.username}</div>
                            </NavLink >
                            {artist.id !== user_id ? <button onClick={toggleFollow} className='imageCardBox__details__header__follow'>{following ? 'following' : 'follow'}</button> : null}

                            <div className='imageCardBox__details__header__bookmark' onClick={toggleBookmark}>
                                <Tooltip title="bookmark"><div>{bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}</div></Tooltip>
                            </div>
                        </div>

                        <div className='imageCardBox__details__prompt'>
                            <span>prompt: </span><span title='copy' ref={textRef} onClick={copyText}>{images[currentIndex]?.prompt}</span>
                        </div>

                        {images[currentIndex]?.instructions && <div className='imageCardBox__details__instructions'>Extra steps: {images[currentIndex]?.instructions}</div>}

                        <div className='imageCardBox__details__date' >created {timeSince(images[currentIndex]?.date)} using {images[currentIndex]?.ai}</div>

                        <div className='imageCardBox__details__dimensions' >
                            <Tooltip title="Download Image"><DownloadIcon onClick={download} fontSize='large' /></Tooltip>
                            <div>{imageDimensions.width} x {imageDimensions.height}</div>
                        </div>

                        <div className='imageCardBox__details__rating'>
                            <div>Rating</div>
                            <HoverRating rating={rating} submitRating={submitRating} />
                        </div>

                    </div>

                </div>

            </div>
        </Modal>
    );
}

export default ImageCardModal;