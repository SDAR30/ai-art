import './App.css';
import ImageList from './components/imageList/ImageList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './layout/navbar/Navbar';
import ImageView from './components/imageView/ImageView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/images/:imageID" element={<ImageView />} />
          <Route path="/" element={<ImageList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
