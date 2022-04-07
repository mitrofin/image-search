import { Component } from 'react';
import FetchImage from './services/fetchImage';
import Loaders from './components/Loader';
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
      </div>
    );
  }
}

export default App;
