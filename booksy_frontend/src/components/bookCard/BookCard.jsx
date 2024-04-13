import { useNavigate } from 'react-router-dom';
import { ReviewStars } from '../ReviewStars';
import PropTypes from 'prop-types';
import './_BookCard.scss';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleGoToDetailsPage = () => {
    const bookTitle = book.title.split(' ').join('_');
    navigate(`/books/${bookTitle}/${book._id}`);
  };

  return (
    <div
      key={book?._id}
      onClick={handleGoToDetailsPage}
      className='bookCard-container'
    >
      <div className='bookCover-container'>
        <img className='bookCard-cover' src={book?.image?.thumbnail} alt='' />
      </div>
      <div className='bookInfo-container'>
        <h2>
          {book?.title.split(' ').length < 5
            ? book?.title
            : book?.title.split(' ').slice(0, 4).join(' ')}
          {book?.title.split(' ').length < 5 ? '' : '...'}
        </h2>
        <p>{book?.author}</p>
        <ReviewStars rating={book?.avgRating} />
        <p className='book-price'>{book?.price} €</p>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
};
