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
            <div className="navbar__toggleIcon" onClick={() => setActive(!active)}>=</div>
            <div className='navbar__buttons'>

                <div className={active ? "navbar__menuItems-active" : "navbar__menuItems"} onClick={() => setActive(false)}>
                    <li className="navbar__menuItem"> <NavLink to="/">Gallery</NavLink ></li>
                    <li className="navbar__menuItem"><NavLink to="/about">About</NavLink></li>
                    <li className="navbar__menuItem"><NavLink to="/contact">Contact</NavLink></li>
                    {user && <li className="navbar__menuItem"><NavLink to="/images/new">Upload</NavLink ></li>}

                </div>

                {!user ?
                    <div className="navbar__logButtons">
                        <button className="navbar__loginButton navbar__logButton" onClick={openLoginButton}><LoginIcon /><span>LOG IN</span></button>
                        <button className="navbar__signupButton navbar__logButton" onClick={openSignupButton}><span>SIGN UP</span> <AddCircle /></button>
                    </div> :
                    <ProfileIcon setActive={setActive} setUser={setUser} />
                }
            </div>

        </div>
    );
}

export default Navbar;