import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss'
import UserContext from '../../UserContext';
import ProfileIcon from '../../components/profileIcon/ProfileIcon';
import MenuIcon from '@mui/icons-material/Menu';

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
            <div className="navbar__toggleIcon" onClick={() => setActive(!active)}> <MenuIcon className='navbar__menuIcon' fontSize='large' style={{ color: 'white'}}/> </div>
            <div className='navbar__buttons'>

                <div className={active ? "navbar__menuItems-active" : "navbar__menuItems"} onClick={() => setActive(false)}>
                    <li className="navbar__menuItem"> <NavLink className={`navbar__navlink${active ? "-active" : ""}`} to="/">Gallery</NavLink ></li>
                    <li className="navbar__menuItem"><NavLink className={`navbar__navlink${active ? "-active" : ""}`} to="/about">About</NavLink></li>
                    <li className="navbar__menuItem"><NavLink className={`navbar__navlink${active ? "-active" : ""}`} to="/contact">Contact</NavLink></li>
                    <li className="navbar__menuItem"><NavLink className={`navbar__navlink${active ? "-active" : ""}`} to="images/create">Create</NavLink></li>
                    {user && <li className="navbar__menuItem"><NavLink className={`navbar__navlink${active ? "-active" : ""}`}  to="/images/new">Upload</NavLink ></li>}

                </div>

                {!user ?
                    <div className="navbar__logButtons">
                        <button className="navbar__loginButton navbar__logButton" onClick={openLoginButton}><span>LOG IN</span></button>
                        <button className="navbar__signupButton navbar__logButton" onClick={openSignupButton}><span>SIGN UP</span></button>
                    </div> :
                    <ProfileIcon setActive={setActive} setUser={setUser} />
                }
            </div>

        </div>
    );
}

export default Navbar;