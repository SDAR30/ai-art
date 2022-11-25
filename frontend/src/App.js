import './App.css';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './layout/navbar/Navbar';
import ImageView from './components/imageView/ImageView';
import Home from './pages/Home';
import LoginModal from './components/loginModal/LoginModal';

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') ? true : false)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setOpenLoginModal={setOpenLoginModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <LoginModal openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/images/:imageID" element={<ImageView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
