import React from 'react';
import ProfileImageCard from '../profileImageCard/ProfileImageCard';
import './ProfileImageContainer.scss';

function ProfileImageContainer({ title, images }) {
    return (
        <div className='profileImageContainer'>
            <h3 className='profileImageContainer__title'>{title} </h3>
            <div className='profileImageContainer__images'>
                {images.map(image => {
                    return (
                        <ProfileImageCard key={image.id} image={image} images={images}/>
                    )
                })}
            </div>
        </div>
    );
}

export default ProfileImageContainer;