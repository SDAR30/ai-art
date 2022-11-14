import React, { useState, useEffect } from 'react';
import ImageCard from '../imageCard/ImageCard';
import './ImageList.scss'

const ImageList = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const URL = 'http://localhost:3333/images'
        fetch(URL).then(res => res.json())
            .then(data => {
                setImages(data)
            })
    }, [])

    return (
        <div className="imageList">
            {images.map(image=> <ImageCard image={image} key={image.id} />)}
        </div>
    );
}

export default ImageList;