import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import './ProfileUserCard.scss';
import { apiURL } from "../../utils/apiURL";
import Notification from '../notifcation/Notification';

function ProfileUserCard({ username, userID, email, pic, myProfile}) {
    const URL = apiURL();
    const [following, setFollowing] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [cookies] = useCookies('token');
    const user_id = cookies.token ? cookies.user.id : 0;
    const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png";

    useEffect(() => {
        const isFollowing = async () => {
            if (!user_id) return; //if user is not logged in, return
            if(myProfile) return; //if user is on their own profile, return
            const response = await fetch(`${URL}/follows/${user_id}/${userID}`);
            const data = await response.json();
            if(data) { setFollowing(true); }
            else { setFollowing(false); }
            return;
        }
        isFollowing();
      
    }, [user_id, myProfile, userID, URL])

    const toggleFollow = async () => {
        if(myProfile) return; //if user is on their own profile, return
        if (!user_id) {
            setAlertMessage('log in to follow artists');
            setAlert(true);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id, artist_id: userID })
        }
        const response = await fetch(`${URL}/follows`, requestOptions);
        const data = await response.json();
        if (data.error) {
            setAlertMessage('error: ' + data.message);
            setAlert(true);
        }
        else {
            setFollowing(!following);
        }
    }
    

    return (
        <div className="profileUserCard">
            <Notification alert={alert} message={alertMessage}  severity={'info'}  setAlert={setAlert} />

            <div className="profileUserCard__userInfo">

                <img className="profilePic" alt='profile' src={pic ? pic : defaultProfileImage} />
                <div className="name">{username} </div>
                <div className="email">{email}</div>
                <div ><button  onClick={toggleFollow} className="editButton">{myProfile ? 'edit profile' : (following ? 'following' : 'follow')}</button></div>
            </div>

            <div className="profileUserCard__stats">
                <div>
                    <div className="quantity">13</div>
                    <div className="type">images</div>
                </div>
                <div>
                    <div className="quantity">32</div>
                    <div className="type">follewers</div>
                </div>
                <div>
                    <div className="quantity">4</div>
                    <div className="type">following</div>
                </div>
            </div>

        </div>

    );
}

export default ProfileUserCard;