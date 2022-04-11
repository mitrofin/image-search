import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import 'react-toastify/dist/ReactToastify.css';
/* import Modal from './components/Modal'; */

/* console.log(FetchImage('car')); */

class App extends Component {
  state = {
    searchImage: '',
  };

  handleFormSubmit = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImage={this.state.searchImage} />
        <ToastContainer autoClose={3000} position="top-right" type="default" />
      </div>
    );
  }
}

export default App;
