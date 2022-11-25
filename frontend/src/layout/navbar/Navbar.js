import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Navbar.scss'

function Navbar({ setOpenLoginModal, loggedIn, setLoggedIn }) {
    const [active, setActive] = useState(false)

    const logOut = ()=>{
        console.log('Logged out')
        //delete accessToken from localStorage
        localStorage.removeItem('accessToken')
        setLoggedIn(false);
    }

    return (
        <div className="navbar">
            <div className="navbar__logo"><Link to="/">AI ART</Link ></div>
            <div className={active ? "navbar__menuItems active" : "navbar__menuItems"}>
                <li className="navbar__menuItem"> <Link to="/">Gallery</Link ></li>
                <li className="navbar__menuItem"><Link to="/about">About</Link></li>
                <li className="navbar__menuItem"><Link to="/contact">Contact</Link></li>
                {loggedIn && <Button variant="contained" onClick={logOut}>Log Out</Button> }
                {!loggedIn && <Button className="navbar__login" variant="contained" onClick={() => setOpenLoginModal(true)}>
                    log in
                </Button>}
            </div>
            <div className="navbar__toggleIcon" onClick={() => setActive(!active)}>=</div>
        </div>
    );
}

export default Navbar;