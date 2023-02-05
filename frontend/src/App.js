import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './layout/navbar/Navbar';
import ImageView from './components/imageView/ImageView';
import Home from './pages/Home';
import LoginModal from './components/loginModal/LoginModal';
import ImageUpload from './components/imageUpload/ImageUpload';
import UserContext from './UserContext';
import { useCookies } from 'react-cookie';
import CreateImage from './components/createImage/CreateImage';
import Profile from './components/profile/Profile';
import OtherProfile from './components/profile/OtherProfile';
import Notification from './components/notifcation/Notification';



function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [loginMessage, setLoginMessage] = useState('');
  const [loginAlert, setLoginAlert] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies('token');
  const [user, setUser] = useState(cookies.token ? { token: cookies.token } : null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar setOpenLoginModal={setOpenLoginModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <LoginModal openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} setLoginMessage={setLoginMessage} 
          setSeverity={setSeverity} setLoginAlert={setLoginAlert} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Notification message={loginMessage} severity={severity} loginAlert={loginAlert} setLoginAlert={setLoginAlert}/>

          <Routes>
            <Route path="/images/:imageID" element={<ImageView />} />
            <Route path="images/new" element={<ImageUpload setLoginMessage={setLoginMessage} setSeverity={setSeverity} setLoginAlert={setLoginAlert}/>} />
            <Route path='images/create' element={<CreateImage />} />
            <Route path="/profile/:userID" element={<OtherProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
