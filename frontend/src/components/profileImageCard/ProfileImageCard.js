import React, { useState } from 'react';
import ImageCardModal from '../imageCardModal/ImageCardModal';
import './ProfileImageCard.scss';

function ProfileImageCard({ image, images }) {
    const [openCardModal, setOpenCardModal] = useState(false);

    const openModalForImage = () => {
        setOpenCardModal(true);
    }

    return (
        <div>
            <div className='profileImageCard' onClick={openModalForImage}>
                <ImageCardModal openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} 
                startingIndex={images.findIndex(element => element.id === image.id)} images={images} />
                <img src={image.url} alt='user ai generated' />
                <div className='profileImageCard__overlay'>
                    <p className='profileImageCard__overlay__title'>{image.title}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileImageCard;