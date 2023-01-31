import React from 'react';
import './ProfileImageCard.scss';

function ProfileImageCard({image}) {
    return (
        <div className='profileImageCard'>
            <img src={image.url} alt='user made'/>
        </div>
    );
}

export default ProfileImageCard;