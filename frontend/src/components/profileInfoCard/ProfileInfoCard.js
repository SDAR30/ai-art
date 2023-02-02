import React from 'react';
import './ProfileInfoCard.scss';

function ProfileInfoCard({images}) {
    const totalImages = images.length;
    const totalBookmarks = images.reduce((acc, image) => {
        return acc + image.Bookmarks;
    }, 0);
    const averageRating = images.reduce((acc, image) => {
        return acc + image.rating;
    }, 0) / totalImages;
    const powerRating = totalBookmarks * totalImages;

    return (
        <div className='profileInfoCard'>
            <h3 className='profileInfoCard__title'> Image Stats</h3>
            <div className='profileInfoCard__total'>Total images generated: {totalImages}</div>
            <div className='profileInfoCard__bookmarks'>Total bookmarked images: {totalBookmarks}</div>
            <div className='profileInfoCard__average'>Average image rating: {averageRating}</div>
            <div className='profileInfoCard__power'>Power rating: {powerRating} </div>
        </div>
    );
}

export default ProfileInfoCard;