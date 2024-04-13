import SearchBar from '../../components/searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import './_Home.scss';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='homepage'>
      <SearchBar />

      <div className='homepage-content'>
        <div className='image-container'>
          <div className='hero'>
            <h1>Find your next great read with</h1>
            <p className='shop-name'>Booksy</p>
            <button onClick={() => navigate('/books/selection')}>
              Our Book Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
