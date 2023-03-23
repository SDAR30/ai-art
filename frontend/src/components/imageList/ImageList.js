import React, { useState, useEffect } from 'react';
import SelectBar from '../selectBar/SelectBar';
import ImageCard from '../imageCard/ImageCard';
import SearchBar from '../searchBar/SearchBar';
import './ImageList.scss'
import { apiURL } from "../../utils/apiURL"
import useWindowDimensions from '../../utils/getWindowDimensions';
import CircularProgress from '@mui/material/CircularProgress';
import { getFirstNWords } from '../../utils/stringUtils';


const ImageList = () => {
    const URL = apiURL();
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const { width } = useWindowDimensions();
    let numberOfColumns = Math.ceil(width / 420);

    const handleSelectChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    }

    useEffect(() => {
        fetch(`${URL}/ratings/average/all`).then(res => res.json())
            .then(data => {
                setImages(data)
                setLoading(false);
            })
    }, [URL])

    const filterImages = images => {
        let filteredImages = images;
        if (searchTerm) {
            filteredImages = images.filter(image => {
                const search = searchTerm.toLowerCase();
                let title = image.title.toLowerCase();
                let titleWords = title.split(' ');
                //if there is any word in titleWords that has a -, split it into two words and add both to titleWords
                titleWords = titleWords.reduce((acc, word) => {
                    if (word.includes('-')) {
                        let splitWords = word.split('-');
                        acc.push(splitWords[0]);
                        acc.push(splitWords[1]);
                        acc.push(word)
                    } else {
                        acc.push(word);
                    }
                    return acc;
                }, [])


                let keywords = [...titleWords, ...getFirstNWords(image.prompt, 10).toLowerCase().split(' ')]
                return keywords.some(word => word.startsWith(search)) ? title : null;
            })
        }
        numberOfColumns = filteredImages.length < numberOfColumns ? filteredImages.length : numberOfColumns;
        return filteredImages;
    }

    const orderImages = images => {
        if (!selectedOption) return images;
        let orderedImages = images;
        switch (selectedOption) {
            case 1: //latest
                orderedImages = images.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 2: //oldest
                orderedImages = images.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 3: //rating
                orderedImages = images.sort((a, b) => b.avg_rating - a.avg_rating);
                break;
            case 4: //ai name, alphabetically
                orderedImages = images.sort((a, b) => a.ai.localeCompare(b.ai));
                break;
            default:
                break;
        }
        return orderedImages;
    }

    const reOrderImages = images => {
        let reOrderedImages = [];
        for (let i = 0; i < numberOfColumns; i++) {
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

    let filteredImages = orderImages(filterImages(images));
    let orderedImages = reOrderImages(filteredImages);

    return (<div className="imageList">
        {loading ? <CircularProgress className='imageList__loading' thickness={7} size={'5rem'} /> : <>
            <div className='imageList__bar'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SelectBar selectedOption={selectedOption} handleSelectChange={handleSelectChange} />
            </div>
            <div className='imageList__grid'>
                {orderedImages.map((column, index) =>
                    <div className='imageList__column' key={index}>{column.map(image =>
                        <ImageCard image={image} key={image.id} width={width}
                            numberOfColumns={numberOfColumns} images={orderedImages.flat()} />)}
                    </div>)}
            </div>
            {!orderedImages.length && <div className='imageList__noResults'>No results</div>}
        </>}
    </div>);
}

export default ImageList;