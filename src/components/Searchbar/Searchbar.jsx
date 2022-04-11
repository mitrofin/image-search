import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.scss';

import { BsSearch } from 'react-icons/bs';

/* import findImage from '../Searchbar/search.png'; */

export default class Searchbar extends Component {
  state = {
    imageSearch: '',
  };

  handleNameChange = e => {
    this.setState({ imageSearch: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageSearch.trim() === '') {
      toast.error('Pleese enter correct value!');
      return;
    }
    this.props.onSubmit(this.state.imageSearch);
    this.setState({ imageSearch: '' });
  };
  render() {
    return (
      <div>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.searchFormButton}>
              <BsSearch style={{ width: 20, height: 20 }} />
              {/* <span className={s.searchFormButtonLabel}>Search</span> */}
            </button>
            <input
              className={s.searchFormInput}
              type="text"
              value={this.state.imageSearch}
              autoComplete="off"
              autoFocus
              placeholder="Enter a query to search for the image"
              onChange={this.handleNameChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
