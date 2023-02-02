import React from 'react';
import ProfileImageCard from '../profileImageCard/ProfileImageCard';
import './ProfileImageContainer.scss';

function ProfileImageContainer({ images }) {
    return (
        <div className='profileImageContainer'>
            <h3>{images.length ? 'My Images' : 'No Images Made Yet'} </h3>
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