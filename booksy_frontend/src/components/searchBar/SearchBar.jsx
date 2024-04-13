import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './_SearchBar.scss';

export default function SearchBar() {
  const { hideUpdateDeleteBookForms, updateSuccess, setUpdateSuccess } =
    useContext(Context);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const plused = e.target.search.value.split(' ').join('+');
    e.target.reset();
    setUpdateSuccess(!updateSuccess);
    navigate(`/books/request/search?q=${plused}`);
  };

  return (
    <form className='search-form' onSubmit={handleSearch}>
      <input className='search-input' type='text' name='search' id='search' />
      <button
        className='search-btn'
        type='submit'
        onClick={hideUpdateDeleteBookForms}
      >
        <FaSearch size={21} color={'#3c4f58'} />
      </button>
    </form>
  );
}
