import React, { useState, useContext, useEffect } from 'react';
import './Profile.scss';
import { apiURL } from "../../utils/apiURL";
import UserContext from '../../UserContext';
import ProfileUserCard from '../profileUserCard/ProfileUserCard';
import ProfileImageContainer from '../profileImageContainer.js/ProfileImageContainer';

function Profile(props) {
    const [userImages, setUserImages] = useState([]);
    const URL = apiURL();
    // get user from provider context
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
            <ProfileUserCard username={user.username} email={user.email}/>
            <ProfileImageContainer images={userImages}/>
            
        </div>
    );
}

export default Profile;