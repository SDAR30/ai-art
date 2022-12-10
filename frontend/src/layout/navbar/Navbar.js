import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss'
import UserContext from '../../UserContext';
import Button from '@mui/material/Button';
import ProfileIcon from '../../components/profileIcon/ProfileIcon';


function Navbar({ setOpenLoginModal }) {
    const [active, setActive] = useState(false)
    const { user, setUser } = useContext(UserContext);

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
                <Button className="navbar__loginButton" onClick={() => setOpenLoginModal(true)}> {"LOG IN"} </Button> :
                <ProfileIcon setActive={setActive} setUser={setUser}/>
            }

        </div>
    );
}

export default Navbar;