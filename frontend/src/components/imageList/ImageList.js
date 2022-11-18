import React, { useState, useEffect } from 'react';
import ImageCard from '../imageCard/ImageCard';
import SearchBar from '../searchBar/SearchBar';
import './ImageList.scss'

const ImageList = () => {
    const [images, setImages] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const URL = 'https://ai-art-backend.adaptable.app/images'
        fetch(URL).then(res => res.json())
            .then(data => {
                setImages(data)
            })
    }, [])

    let filteredImages = images;
    if(searchTerm){
        filteredImages = images.filter(image=>{
            const search = searchTerm.toLowerCase();
            const title = image.title.toLowerCase();
            return title.split(' ').some(word => word.startsWith(search)) ? title : null;
        })
    }

    return (
        <div className="imageList">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {filteredImages.map(image=> <ImageCard image={image} key={image.id} />)}
            {!filteredImages.length && <div className='imageList__noResults'>No results</div>}
        </div>
    );
}

export default ImageList;