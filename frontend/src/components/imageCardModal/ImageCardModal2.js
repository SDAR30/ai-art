import React, { useState, useEffect, useRef } from 'react';
//import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ImageCardModal.scss'
import { timeSince } from '../../utils/dateUtils';
import { apiURL } from "../../utils/apiURL"
import { NavLink } from 'react-router-dom';
import HoverRating from '../hoverRating/HoverRating';
import { roundToHalf } from '../../utils/mathUtils';
import { useCookies } from 'react-cookie';
//import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Notification from '../notifcation/Notification';


function ImageCardModal2({ openCardModal, setOpenCardModal, image, showNextImage, imageDimensions }) {
    let { id, ai, date, prompt, title, instructions, url, avg_rating } = image;
    const [currentAvgRating, setCurrentAvgRating] = useState(roundToHalf(avg_rating));
    const [loginMessage, setLoginMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [artist, setArtist] = useState({});
    const URL = apiURL();
    const [cookies] = useCookies('token');
    const user_id = cookies.token ? cookies.user.id : 0;
    const textRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const toggleImageSize = () => {
        setExpanded(!expanded);
        //open image in new tab
        //onClick={() => window.open(image.url)} 
    }

    //to copy text to clipboard, create a textarea element, set its value to the text, select it, and copy it
    //then remove the textarea element
    const copyText = () => {
        const text = textRef.current.textContent;
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        alert("Text copied to clipboard!");
    }

    // const downloadImage = () => {
    //     let imageURL = image.url;
    //     console.log('imageURL: ', imageURL)
    //     if (!imageURL.includes('ai-art'))
    //         imageURL = 'https://cors-anywhere.herokuapp.com/' + image.url;
    //     fetch(imageURL)
    //         .then(res => res.blob())
    //         .then(blob => {
    //             saveAs(blob, `${title}.png`);
    //         })
    // }

    const download = e => {
        let imageURL = image.url;
        if (!imageURL.includes('ai-art'))
            imageURL = 'https://cors-anywhere.herokuapp.com/' + image.url;
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
            setLoginMessage('log in to rate images');
            setAlert(true);
            return;
        }
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

    const toggleBookmark = async () => {
        if (!user_id) {
            setLoginMessage('log in to save bookmarks');
            setAlert(true);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: id, user_id: user_id })
        }
        const response = await fetch(`${URL}/bookmarks`, requestOptions);
        const data = await response.json();
        if (data.error) {
            alert('error: ' + data.message);
        }
        else {
            setBookmark(!bookmark);
        }
    }


    useEffect(() => {
        const getArtist = async () => {
            const response = await fetch(`${URL}/users/${image.user_id}`);
            const data = await response.json();
            setArtist(data);
        }

        const isBookmarked = async () => {
            if (!user_id) return; //if user is not logged in, return
            const response = await fetch(`${URL}/bookmarks/${user_id}/${image.id}`);
            const data = await response.json();
            if (data) { setBookmark(true); }
            else { setBookmark(false); }
            return;
        }

        isBookmarked();
        getArtist();



    }, [image.user_id, URL, image.id, user_id])

    const handleClose = () => {
        setOpenCardModal(false);
        setExpanded(false);
        //reset image 
        showNextImage(image, false, true);
    }

    const nextImageModal = (goForward = true) => {
        showNextImage(image, goForward);
    }

    return (
        <Modal
            className='imageCardModal'
            open={openCardModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div>
                <Notification alert={alert} setAlert={setAlert} message={loginMessage} severity='info' />
                <div className='imageCardModal__navigation'>
                    <Tooltip title="previous image"><NavigateBeforeIcon className='imageCardModal__prev' onClick={() => nextImageModal(false)} fontSize='large' /></Tooltip>
                    <Tooltip title="close image"><CloseIcon className='imageCardModal__close' onClick={handleClose} fontSize='large' /></Tooltip>
                    <Tooltip title="next image"><NavigateNextIcon className='imageCardModal__next' onClick={nextImageModal} fontSize='large' /></Tooltip>
                </div>
                <div className='imageCardBox'>

                    <div className='imageCardBox__image'>
                        <Tooltip title="expand image"><FullscreenIcon className='imageCardBox__image__fullscreen' onClick={toggleImageSize} /></Tooltip>

                        <img className={expanded ? 'imageCardBox__image__img-expanded imageCardBox__image__img' : 'imageCardBox__image__img'} onClick={toggleImageSize} src={url} alt="modal view" />
                    </div>

                    <div className='imageCardBox__details'>

                        <div className='imageCardBox__details__header'>
                            <h2 className='imageCardBox__details__header__title'> {title} </h2>
                            <NavLink className='imageCardBox__details__header__artist' to={`/profile/${artist.id}`}>

                                    <img src={artist.pic} alt='profile'></img>
                                    <div>by {artist.username}</div>
                            </NavLink >
                            <div className='imageCardBox__details__header__bookmark' onClick={toggleBookmark}>
                                <Tooltip title="bookmark"><div>{bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}</div></Tooltip>
                            </div>
                        </div>

                        <div className='imageCardBox__details__prompt'>
                            <span>prompt: </span><span title='copy' ref={textRef} onClick={copyText}>{prompt}</span>
                        </div>

                        {instructions && <div className='imageCardBox__details__instructions'>Extra steps: {instructions}</div>}

                        <div className='imageCardBox__details__date' >created {timeSince(date)} using {ai}</div>

                        <div className='imageCardBox__details__dimensions' >
                            <Tooltip title="Download Image"><DownloadIcon onClick={download} fontSize='large' /></Tooltip>
                            <div>{imageDimensions.width} x {imageDimensions.height}</div>
                        </div>

                        <div className='imageCardBox__details__rating'>
                            <div>Rating</div>
                            <HoverRating rating={currentAvgRating} submitRating={submitRating} />
                        </div>

                    </div>

                </div>
            </div>
        </Modal>
    );
}

export default ImageCardModal2;