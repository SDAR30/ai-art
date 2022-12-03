import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Navbar.scss'
import { useCookies } from "react-cookie";
import UserContext from '../../UserContext';

function Navbar({ setOpenLoginModal }) {
    const [active, setActive] = useState(false)
    const [,,removeCookie] = useCookies('token');
    const { user, setUser } = useContext(UserContext);

    const logOut = () => {
        setUser(null);
        removeCookie('token');
        console.log('Logged out')
        //document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //setLoggedIn(false);
    }

    return (
        <div className="navbar">
            <div className="navbar__logo"><Link to="/">AI ART</Link ></div>
            <div className={active ? "navbar__menuItems active" : "navbar__menuItems"}>
                <li className="navbar__menuItem"> <Link to="/">Gallery</Link ></li>
                {user && <li className="navbar__menuItem"><Link to="/images/new">Upload</Link ></li>}
                <li className="navbar__menuItem"><Link to="/about">About</Link></li>
                <li className="navbar__menuItem"><Link to="/contact">Contact</Link></li>
                {user && <Button variant="contained" onClick={logOut}>Log Out</Button>}
                {!user && <Button className="navbar__login" variant="contained" onClick={() => setOpenLoginModal(true)}>
                    log in
                </Button>}
            </div>
            <div className="navbar__toggleIcon" onClick={() => setActive(!active)}>=</div>
        </div>
    );
}

export default Navbar;