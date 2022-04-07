import { Component } from 'react';
import FetchImage from './services/fetchImage';
import Loaders from './components/Loader';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
/* import Modal from './components/Modal'; */

console.log(FetchImage('car'));

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
        Hello
        <Loaders />
        <ToastContainer autoClose={3000} position="top-right" type="default" />
      </div>
    );
  }
}

export default App;
