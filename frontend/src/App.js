import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import Navbar from './layout/navbar/Navbar';
import ImageView from './components/imageView/ImageView';
import Home from './pages/Home';
import LoginModal from './components/loginModal/LoginModal';
import NewImage from './components/newImage/NewImage';
import { getCookie } from './utils/cookieUtils';

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(getCookie('accessToken') ? true : false)
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {

    setTimeout(function() {
      setLoginMessage('')
    }, 3000)

  }, [loginMessage])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setOpenLoginModal={setOpenLoginModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <LoginModal openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} setLoggedIn={setLoggedIn} setLoginMessage={setLoginMessage}/>
        {loginMessage && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {loginMessage}
          </Alert>
        }
        <Routes>
          <Route path="/images/:imageID" element={<ImageView />} />
          <Route path="images/new" element={<NewImage loggedIn={loggedIn}/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
