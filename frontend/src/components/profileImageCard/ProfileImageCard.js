import React from 'react';
import './ProfileImageCard.scss';

function ProfileImageCard({image}) {
    return (
        <div className='profileImageCard'>
            <img src={image.url} alt='user ai generated'/>
            <div className='profileImageCard__overlay'>
                <p className='profileImageCard__overlay__title'>{image.title}</p>
            </div>
        </div>
    );
}

export default ProfileImageCard;