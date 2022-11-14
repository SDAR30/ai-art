import React, { useState, useEffect } from 'react';

const imageList = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const URL = 'http://localhost:3333/images'
        fetch(URL).then(res => res.json())
            .then(data => {
                setImages(data.images)
            })
    }, [])

    return (
        <div>
            images:
            {images[0]}
        </div>
    );
}

export default ImageList;