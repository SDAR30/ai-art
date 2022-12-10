import React, {useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useCookies } from "react-cookie";
import UserContext from '../../UserContext';

export default function ProfileIcon({setActive}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [, , removeCookie] = useCookies('token');
  const { user, setUser } = useContext(UserContext);

  const handleClick = (event) => {
    setActive(false) //closes hamburger menu
     setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setUser(null);
    removeCookie('token');
    console.log('Logged out')
    //document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //setLoggedIn(false);
}

  return (
    <div>
      <Button id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: 'lawngreen' }}>{user.username[0]}</Avatar>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top',horizontal: 'left',}}
      >
        <MenuItem onClick={handleClose}><NavLink to="/profile">Profile</NavLink></MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}