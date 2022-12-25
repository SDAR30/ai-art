import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss'
import UserContext from '../../UserContext';
import LoginIcon from '@mui/icons-material/Login';
import ProfileIcon from '../../components/profileIcon/ProfileIcon';
import AddCircle from '@mui/icons-material/AddCircle';

function Navbar({ setOpenLoginModal, isLoggedIn, setIsLoggedIn }) {
    const [active, setActive] = useState(false)
    const { user, setUser } = useContext(UserContext);
    // const styles ={
    //     loginButton:{
    //         borderRadius: '20px',
    //         fontSize: '.8rem',
    //         fontWeight: 'bold',
    //         margin: '0 .5rem',
    //         padding: '.2rem .5rem',
    //         color: 'primary.contrastText',
    //         '&:hover': {
    //             backgroundColor: 'primary.main',
    //             opacity: [0.9, 0.8, 0.7],
    //         }
    //     },
    //     signupButton:{
    //         borderRadius: '20px',
    //         fontSize: '.8rem',
    //         fontWeight: 'bold',
    //         padding: '.2rem .5rem',
    //         '&:hover': {
    //             backgroundColor: 'background.paper',
    //             opacity: [0.9, 0.8, 0.7],
    //         }
    //     }
    // }

    const openLoginButton = () => {
        setIsLoggedIn(false)
        setOpenLoginModal(true)
    }
    const openSignupButton = () => {
        setIsLoggedIn(true)
        setOpenLoginModal(true)
    }

    return (
        <div className="navbar">

            <div className="navbar__logo"><NavLink to="/">AI ART</NavLink ></div>

            <div className={active ? "navbar__menuItems-active" : "navbar__menuItems"} onClick={() => setActive(false)}>
                <li className="navbar__menuItem"> <NavLink to="/">Gallery</NavLink ></li>
                <li className="navbar__menuItem"><NavLink to="/about">About</NavLink></li>
                <li className="navbar__menuItem"><NavLink to="/contact">Contact</NavLink></li>
                {user && <li className="navbar__menuItem"><NavLink to="/images/new">Upload</NavLink ></li>}

            </div>
            <div className="navbar__toggleIcon" onClick={() => setActive(!active)}>=</div>

            {!user ?
                <div className="navbar__buttons">
                    <button className="navbar__loginButton navbar__button" onClick={openLoginButton}><LoginIcon /><span>LOG IN</span></button>
                    <button className="navbar__signupButton navbar__button" onClick={openSignupButton}><span>SIGN UP</span> <AddCircle /></button>
                </div> :
                <ProfileIcon setActive={setActive} setUser={setUser} />
            }

        </div>
    );
}

export default Navbar;