import React from 'react';
import ProfileImageCard from '../profileImageCard/ProfileImageCard';
import './ProfileImageContainer.scss';

function ProfileImageContainer({ images }) {
    return (
        <div className='profileImageContainer'>
            <h3>My Images</h3>
            <div className='profileImageContainer__images'>
                {images.map(image => {
                    return (
                        <ProfileImageCard key={image.id} image={image}/>
                    )
                })}
            </div>
        </div>
    );
}

export default ProfileImageContainer;