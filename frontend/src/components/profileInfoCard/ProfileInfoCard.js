import React, {useState, useEffect} from 'react';
import './ProfileInfoCard.scss';
import { apiURL } from "../../utils/apiURL";

function ProfileInfoCard({images, userID}) {
    const totalImages = images.length;
    const [totalBookmarks, setTotalBookmarks] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const URL = apiURL();

    useEffect(() => {
        const getTotalBookmarks = async () => {
            const response = await fetch(`${URL}/bookmarks/artist/${userID}`);
            const data = await response.json();
            setTotalBookmarks(data.count);
        }

        const getAverageRating = async () => {
            const response = await fetch(`${URL}/ratings/average/user/${userID}`);
            const data = await response.json();
            setAverageRating(data.avg_rating);
        }

        getTotalBookmarks();
        getAverageRating();

    }, [userID, URL])



    // const totalBookmarks = images.reduce((acc, image) => {
    //     return acc + image.Bookmarks;
    // }, 0);
    // const averageRating = images.reduce((acc, image) => {
    //     return acc + image.rating;
    // }, 0) / totalImages;
    // const powerRating = totalBookmarks * totalImages;

    return (
        <div className='profileInfoCard'>
            <h3 className='profileInfoCard__title'> Image Stats</h3>
            <div className='profileInfoCard__total'>Total images generated: {totalImages}</div>
            <div className='profileInfoCard__bookmarks'>Total images liked: {totalBookmarks}</div>
            <div className='profileInfoCard__average'>Average image rating: {averageRating ? averageRating : 'N/A'}</div>
            <div className='profileInfoCard__power'>Power rating: {parseFloat(totalBookmarks) + parseFloat(totalImages) + (parseFloat(averageRating ? averageRating: 0) * 5)} </div>
        </div>
    );
}

export default ProfileInfoCard;