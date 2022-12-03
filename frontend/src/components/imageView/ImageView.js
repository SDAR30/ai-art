import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { apiURL } from "../../utils/apiURL"
import './ImageView.scss'

function ImageView(props) {
    const URL = apiURL();
    let params = useParams();
    const location = useLocation();
    const [image, setImage] = useState({});
    const { imageID } = params;

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

    }, [location.state?.image, imageID, URL])


    return (

        <div>
            {Object.keys(image).length > 0 &&
                <div className='imageView'>
                    <div className='imageView__title'>{`Title: ${image.title}`}</div>
                    <div className='imageView__imageDiv'>
                        <img src={image.url} alt="ai img" />
                    </div>
                    <div className='imageView__details'>
                        {`id: ${image.id}`} <br/>
                        {`ai: ${image.ai}`}  <br/>
                        {`instructions: ${image.instructions}`}  <br/>
                        {`prompt: ${image.prompt}`}  <br/>
                        {`date: ${image.date}`} <br/>
                        {`Made by user: ${image.user_id}`}
                    
                    </div>
                </div>
            }

        </div>
    );
}

export default ImageView;