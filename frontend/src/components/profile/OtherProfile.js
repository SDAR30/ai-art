import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { apiURL } from "../../utils/apiURL";
import { useParams, useLocation } from "react-router-dom";
import ProfileUserCard from '../profileUserCard/ProfileUserCard';
import ProfileImageContainer from '../profileImageContainer.js/ProfileImageContainer';
import ProfileInfoCard from '../profileInfoCard/ProfileInfoCard';

function OtherProfile(props) {
    const [user, setUser] = useState({});
    const [userImages, setUserImages] = useState([]);
    const [bookmarkImages, setBookmarkImages] = useState([]);
    let params = useParams();
    const location = useLocation();
    const { userID } = params;
    const URL = apiURL();

    useEffect(() => {
        if (location.state?.user) {
            console.log("already have user, no need to fetch")
            setUser(location.state?.user)
        } else {
            const userURL = `${URL}/users/${userID}`
            console.log("don't have user, go fetch image")
            fetch(userURL).then(res => res.json())
                .then(data => setUser(data))
        }

    }, [location.state?.user, userID, URL, setUser])

    useEffect(() => {
        try {
            fetch(`${URL}/images/user/${userID}`)
                .then(res => res.json())
                .then(data => {
                    setUserImages(data);
                })

        } catch (err) {
            console.log(err);
        }

        try {
            fetch(`${URL}/bookmarks/${userID}`)
                .then(res => res.json())
                .then(data => {
                    setBookmarkImages(data);
                })

        } catch (err) {
            console.log(err);
        }



    }, [URL, userID])

    return (
        <div className='profile'>
            <div className='profile__section'>
                <ProfileUserCard username={user.username} email={user.email} pic={user.pic}/>
                <ProfileImageContainer title={userImages.length ? (user.username + '\'s images') : "No Images Yet"} images={userImages} />
            </div>
            <div className='profile__section'>
                <ProfileInfoCard images={userImages} />
                <ProfileImageContainer title={"Bookmarked Images"} images={bookmarkImages} />

            </div>
        </div>
    );
}

export default OtherProfile;