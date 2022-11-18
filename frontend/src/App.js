import './App.css';
import ImageList from './components/imageList/ImageList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './layout/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageList />} />
        </Routes>
      </BrowserRouter>
      <ImageList />
    </div>
  );
}

export default App;
