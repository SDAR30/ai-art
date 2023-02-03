import React, { useState, useContext, useEffect } from 'react';
import './Profile.scss';
import { apiURL } from "../../utils/apiURL";
import axios from "axios";
import UserContext from '../../UserContext';
import ProfileUserCard from '../profileUserCard/ProfileUserCard';
import ProfileImageContainer from '../profileImageContainer.js/ProfileImageContainer';

function Profile(props) {
    const [userImages, setUserImages] = useState([]);
    const URL = apiURL();
    const { user } = useContext(UserContext);

    useEffect(() => {


        const getYourImages = async () => {
            if(!user) return;
            try {
                let res = axios.get(`${URL}/images/user/${user?.id}`);
                if(res.data)
                console.log(res.data)
                setUserImages(res.data);
            } catch (error) {
                console.log('inside catch of Profile: getYourImages, error: ', error)
            }
        }
        getYourImages();
        // fetch(`${URL}/images/user/${user?.id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setUserImages(data);
        //     })

    }, [URL, user])

    return (
        <div className='profile'>
            <div className='profile__section'>
                <ProfileUserCard username={user.username} email={user.email} />
                <ProfileImageContainer title={'My Images'} images={userImages} />
            </div>
            <div className='profile__section'>
                <ProfileUserCard username={user.username} email={user.email} />
                <ProfileImageContainer title={'Bookmarked Images'} images={userImages} />

            </div>
        </div>
    );
}

export default Profile;