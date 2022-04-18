import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.scss';

import { BsSearch } from 'react-icons/bs';

/* import findImage from '../Searchbar/search.png'; */

export default function Searchbar({ onSubmit }) {
  const [imageSearch, setImageSearch] = useState('');

  const handleNameChange = e => {
    setImageSearch(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (imageSearch.trim() === '') {
      toast.error('Pleese enter correct value!');
      return;
    }
    onSubmit(imageSearch);
    setImageSearch('');
  };

  return (
    <div>
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <BsSearch style={{ width: 20, height: 20 }} />
            {/* <span className={s.searchFormButtonLabel}>Search</span> */}
          </button>
          <input
            className={s.searchFormInput}
            type="text"
            value={imageSearch}
            autoComplete="off"
            autoFocus
            placeholder="Enter a query to search for the image"
            onChange={handleNameChange}
          />
        </form>
      </header>
    </div>
  );
}
