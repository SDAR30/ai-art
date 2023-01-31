import React from 'react';
import './ProfileUserCard.scss';
import { useCookies } from 'react-cookie';

function ProfileUserCard({ username, email }) {
    const [cookies] = useCookies('token');
    const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png";

    return (
        <div className="profileUserCard">
            <img className="profileUserCard__background" alt='profile background' src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" />

            <div className="profileUserCard__details">

                <div className="profileUserCard__details__userInfo">

                    <img className="profilePic" alt='profile' src={cookies?.user ? cookies?.user?.pic : defaultProfileImage} />
                    <div className="name">{username} </div>
                    <div className="email">{email}</div>
                    <div ><button className="editButton">follow</button></div>
                </div>

                <div className="profileUserCard__details__stats">
                    <div>
                        <div className="quantity">137</div>
                        <div className="type">articles</div>
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

        </div>

    );
}

export default ProfileUserCard;