import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
/* import Modal from './components/Modal'; */

/* console.log(FetchImage('car')); */

function App() {
  const [searchImage, setSearchImage] = useState('');

  const handleFormSubmit = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchImage={searchImage} />
      <ToastContainer autoClose={3000} position="top-right" type="default" />
    </div>
  );
}

export default App;
