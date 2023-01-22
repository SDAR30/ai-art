import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { apiURL } from "../../utils/apiURL"
import StarRating from '../starRating/StarRating';
import './ImageView.scss'
import { convertRatingToPercent } from '../../utils/mathUtils';
import { useCookies } from 'react-cookie';


function ImageView(props) {
    const URL = apiURL();
    let params = useParams();
    const location = useLocation();
    const [image, setImage] = useState({});
    const [imageRating, setImageRating] = useState(null);
    const [cookies] = useCookies('token');
    const user_id = cookies.token ? cookies.user.id : 0;
    const { imageID } = params;

    const submitRating = (e) => {
        e.preventDefault();
        if (!user_id)
            return alert('Please log in to submit an image')
        console.log("submit rating ", e.target.href.slice(-1))
        const rating = e.target.href.slice(-1) //get last character of href
        setImageRating(convertRatingToPercent(rating))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: imageID, rating, user_id })
        }
        fetch(`${URL}/ratings`, requestOptions).then(res => res.json()).then(data => {
            //show success toast message
            data.error ? alert('error: ' + data.message) : console.log('data: ', data)
        }).catch(err => {
            alert('rating failed to post to backend')
            console.log('error in submitRating in ImageView')
        })
        
    }

    useEffect(() => {
        const ratingsURL = `${URL}/ratings/${imageID}`
        fetch(ratingsURL).then(res => res.json())
            .then(data => {
                setImageRating(convertRatingToPercent(data.avg_rating))
            })
    }, [URL, imageID])

    useEffect(() => {
        if (location.state?.image) {
            console.log("already have image, no need to fetch")
            setImage(location.state?.image)
        } else {
            const imageURL = `${URL}/images/${imageID}`
            console.log("don't have image, go fetch image")
            fetch(imageURL).then(res => res.json())
                .then(data => setImage(data))
        }

    }, [location.state?.image, imageID, URL, setImage])


    return (

        <div>
            {Object.keys(image).length > 0 &&
                <div className='imageView'>
                    <div className='imageView__title'>{`Title: ${image.title}`}</div>
                    <div className='imageView__imageDiv'>
                        <img className='imageView__image' src={image.url} alt="ai img" />
                    </div>
                    <StarRating imageID={image.id} imageRating={imageRating} submitRating={submitRating}/>
                    <div className='imageView__details'>
                        {`id: ${image.id}`} <br />
                        {`ai: ${image.ai}`}  <br />
                        {`instructions: ${image.instructions}`}  <br />
                        {`prompt: ${image.prompt}`}  <br />
                        {`date: ${image.date}`} <br />
                        {`Made by user: ${image.user_id}`}

                    </div>
                </div>
            }

        </div>
    );
}

export default ImageView;