import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import Navbar from './layout/navbar/Navbar';
import ImageView from './components/imageView/ImageView';
import Home from './pages/Home';
import LoginModal from './components/loginModal/LoginModal';
import ImageUpload from './components/imageUpload/ImageUpload';
//import { getCookie } from './utils/cookieUtils';
import UserContext from './UserContext';
import {useCookies} from 'react-cookie';
import CreateImage from './components/createImage/CreateImage';



function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  //const [loggedIn, setLoggedIn] = useState(getCookie('accessToken') ? true : false)
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies('token');
  const [user, setUser] = useState(cookies.token ? {token: cookies.token} : null);
  useEffect(() => {

    setTimeout(function () {
      setLoginMessage('')
    }, 3000)

  }, [loginMessage])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar setOpenLoginModal={setOpenLoginModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <LoginModal openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} setLoginMessage={setLoginMessage} 
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          {loginMessage &&
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {loginMessage}
            </Alert>
          }
          <Routes>
            <Route path="/images/:imageID" element={<ImageView />} />
            <Route path="images/new" element={<ImageUpload/>} />
            <Route path='images/create' element={<CreateImage/>}/>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
