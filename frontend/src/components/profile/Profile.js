import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { apiURL } from "../../utils/apiURL";
import ProfileUserCard from '../profileUserCard/ProfileUserCard';
import ProfileImageContainer from '../profileImageContainer.js/ProfileImageContainer';
import { useCookies } from 'react-cookie';

function Profile(props) {
    const [userImages, setUserImages] = useState([]);
    const [bookmarkImages, setBookmarkImages] = useState([]);
    const URL = apiURL();
    const [cookies] = useCookies('token');
    const user = cookies.token ? cookies.user : null;

    useEffect(() => {
        const getYourImages = async () => {
            if(!user) {
                console.log('not logged in')
                return;
            }
            try {
                const response = await fetch(`${URL}/images/user/${user.id}`);
                const data = await response.json();
                setUserImages(data);
            } catch (error) {
                console.log('inside catch of Profile: getYourImages, error: ', error)
            }
        }

        const getBookmarkedImages = async () => {
            if(!user) {
                return;
            }
            try {
                const response = await fetch(`${URL}/bookmarks/${user.id}`);
                const data = await response.json();
                setBookmarkImages(data);
            } catch (error) {
                console.log('inside catch of Profile: getBookmarkedImages, error: ', error)
            }
        }

        getYourImages();
        getBookmarkedImages();

    }, [URL, user])

    return (
        <div className='profile'>
            <div className='profile__section'>
                <ProfileUserCard username={user?.username} email={user?.email} />
                <ProfileImageContainer title={'My Images'} images={userImages} />
            </div>
            <div className='profile__section'>
                <ProfileUserCard username={user?.username} email={user?.email} />
                <ProfileImageContainer title={'Bookmarked Images'} images={bookmarkImages} />

            </div>
        </div>
    );
}

export default Profile;