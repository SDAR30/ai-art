import React, { useState, useEffect } from 'react';
import FilterBar from '../filterBar/FilterBar';
import ImageCard from '../imageCard/ImageCard';
import SearchBar from '../searchBar/SearchBar';
import './ImageList.scss'
import { apiURL } from "../../utils/apiURL"

const ImageList = () => {
    const URL = apiURL();
    const [images, setImages] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch(`${URL}/images`).then(res => res.json())
            .then(data => {
                setImages(data)
            })
    }, [URL])

    let filteredImages = images;
    if (searchTerm) {
        filteredImages = images.filter(image => {
            const search = searchTerm.toLowerCase();
            const title = image.title.toLowerCase();
            return title.split(' ').some(word => word.startsWith(search)) ? title : null;
        })
    }

    return (
        <div className="imageList">
            <div className='imageList__bar'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <FilterBar />
            </div>
            {filteredImages.map(image => <ImageCard image={image} key={image.id} />)}
            {!filteredImages.length && <div className='imageList__noResults'>No results</div>}
        </div>
    );
}

export default ImageList;