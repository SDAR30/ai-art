import React from 'react';
import './ProfileUserCard.scss';

function ProfileUserCard({ username, email, pic }) {
    const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png";

    return (
        <div className="profileUserCard">

            <div className="profileUserCard__userInfo">

                <img className="profilePic" alt='profile' src={pic ? pic : defaultProfileImage} />
                <div className="name">{username} </div>
                <div className="email">{email}</div>
                <div ><button className="editButton">edit</button></div>
            </div>

            <div className="profileUserCard__stats">
                <div>
                    <div className="quantity">137</div>
                    <div className="type">images</div>
                </div>
                <div>
                    <div className="quantity">5228</div>
                    <div className="type">follewers</div>
                </div>
                <div>
                    <div className="quantity">84</div>
                    <div className="type">following</div>
                </div>
            </div>

        </div>

    );
}

export default ProfileUserCard;