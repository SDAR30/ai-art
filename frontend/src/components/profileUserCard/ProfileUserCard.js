import React from 'react';
import './ProfileUserCard.scss';
import { useCookies } from 'react-cookie';

function ProfileUserCard({ username, email }) {
    const [cookies] = useCookies('token');
    const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png";
    //const defaultBackgroundImage = "https://media.istockphoto.com/photos/neon-background-abstract-blue-and-pink-with-light-shapes-line-picture-id1191658515?b=1&k=20&m=1191658515&s=612x612&w=0&h=BtKT_wMgQzpsM_m_AkKciHxT7cY0kW7FijIzryc1cMk=";

    return (
        <div className="profileUserCard">
            {/* <img className="profileUserCard__background" alt='profile background' src={defaultBackgroundImage} /> */}

            <div className="profileUserCard__details">

                <div className="profileUserCard__details__userInfo">

                    <img className="profilePic" alt='profile' src={cookies?.user ? cookies?.user?.pic : defaultProfileImage} />
                    <div className="name">{username} </div>
                    <div className="email">{email}</div>
                    <div ><button className="editButton">edit</button></div>
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