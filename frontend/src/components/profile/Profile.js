import React, { useState, useContext, useEffect } from 'react';
import './Profile.scss';
import { apiURL } from "../../utils/apiURL";
import UserContext from '../../UserContext';
import ProfileUserCard from '../profileUserCard/ProfileUserCard';
import ProfileImageContainer from '../profileImageContainer.js/ProfileImageContainer';

function Profile(props) {
    const [userImages, setUserImages] = useState([]);
    const URL = apiURL();
    const { user } = useContext(UserContext);

    useEffect(() => {
        try{
        fetch(`${URL}/images/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setUserImages(data);
            })

        } catch (err) {
            console.log(err);
        }
    }, [URL, user])

    return (
        <div className='profile'>
            <div className='profile__section'>
            <ProfileUserCard username={user.username} email={user.email}/>
            <ProfileImageContainer title={'My Images'} images={userImages}/>
            </div>
            <div className='profile__section'>
            <ProfileUserCard username={user.username} email={user.email}/>
            <ProfileImageContainer title={'Bookmarked Images'} images={userImages}/>

            </div>
        </div>
    );
}

export default Profile;