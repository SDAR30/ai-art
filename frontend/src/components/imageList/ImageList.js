import React, { useState, useEffect } from 'react';
import FilterBar from '../filterBar/FilterBar';
import ImageCard from '../imageCard/ImageCard';
import SearchBar from '../searchBar/SearchBar';
import './ImageList.scss'
import { apiURL } from "../../utils/apiURL"
import useWindowDimensions from '../../utils/getWindowDimensions';

const ImageList = () => {
    const URL = apiURL();
    const [images, setImages] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { width, height } = useWindowDimensions();
    const numberOfColumns = Math.ceil(width / 420);

    useEffect(() => {
        fetch(`${URL}/images`).then(res => res.json())
            .then(data => {
                setImages(data)
            })
    }, [URL])

    const filterImages = images => {
        let filteredImages = images;
        if (searchTerm) {
            filteredImages = images.filter(image => {
                const search = searchTerm.toLowerCase();
                const title = image.title.toLowerCase();
                return title.split(' ').some(word => word.startsWith(search)) ? title : null;
            })
        }
        return filteredImages;
    }

    const reOrderImages = images => {
        let reOrderedImages = [];
        for (let i = 0; i < numberOfColumns; i++) {
            //console.log(i)
            let j = i;
            while (images[j]) {
                reOrderedImages.push(images[j]);
                j += numberOfColumns;
            }
        }

        let cols = numberOfColumns;
        let styledImages = [];
        while (reOrderedImages.length && cols) {
            let imagesPerColumn = Math.ceil(reOrderedImages.length / cols);
            styledImages.push(reOrderedImages.splice(0, imagesPerColumn))
            cols--;
        }
        return styledImages;
    }

    let filteredImages = filterImages(images);
    let orderedImages = reOrderImages(filteredImages);




    return (
        <div className="imageList">
            <div className='imageList__bar'>
                <p>width: {width}</p>
                <p>height: {height}</p>
                <p>number of columns: {numberOfColumns}</p>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <FilterBar />
            </div>
            <div className='imageList__grid'>
                {orderedImages.map((column,index) => <div className='imageList__column' key={index}>{column.map(image => <ImageCard image={image} key={image.id} />)}</div>)}
                {/* {filteredorderedImages.map(image => <ImageCard image={image} key={image.id} />)} */}
            </div>
            {!orderedImages.length && <div className='imageList__noResults'>No results</div>}
        </div>
    );
}

export default ImageList;