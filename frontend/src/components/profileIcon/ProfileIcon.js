import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useCookies } from "react-cookie";
import UserContext from '../../UserContext';
import './ProfileIcon.scss'

export default function ProfileIcon({ setActive }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cookies, , removeCookie] = useCookies('token');
  const { setUser } = useContext(UserContext);

  const handleClick = (event) => {
    setActive(false) //closes hamburger menu
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setUser(null);

    removeCookie('token', { path: '/' });
    removeCookie('user', { path: '/' });
    console.log("Cookies removed: Current cookies: ", cookies)
    console.log('Logged out')
    //document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //setLoggedIn(false);
  }

  return (
    <div>
      <Button id="demo-positioned-button" aria-controls={open ? 'demo-positioned-menu' : undefined} 
      aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <Avatar alt={cookies?.user ? cookies?.user?.username[0] : '?'} 
         src={cookies?.user ? cookies?.user?.pic : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png'} 
         style={{
          border: '2px solid white' }}
       />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        className='profileIconMenu'
        onClose={handleClose}
        // anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
        // transformOrigin={{ vertical: 'middle', horizontal: 'right', }}
      >
        <MenuItem className='profileIconMenu__item' onClick={handleClose}><NavLink to="/profile">Profile</NavLink></MenuItem>
        <MenuItem className='profileIconMenu__item' onClick={handleClose}>Settings</MenuItem>
        <MenuItem  className='profileIconMenu__item' onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}