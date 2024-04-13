import { useContext, useEffect, useState } from 'react';
import BookCard from '../../components/bookCard/BookCard';
import { useParams } from 'react-router-dom';
import CartBtn from '../../components/CartBtn';
import { ReviewStars } from '../../components/ReviewStars';
import DeleteBtnAdmin from '../../components/DeleteBtnAdmin';
import { Context } from '../../context/Context';
import UpdateBtnAdmin from '../../components/UpdateBtnAdmin';
import UpdateBook from '../../components/updateBook/UpdateBook';
import './_SingleBook.scss';
import DeleteBook from '../deleteBook/DeleteBook';

export default function SingleBook() {
  const [reviews, setReviews] = useState([]);
  const [singleBook, setSingleBook] = useState(null);
  const { user, bookToUpdate, bookToDelete, updateSuccess } =
    useContext(Context);
  const [showBookText, setShowBookText] = useState(false);
  const { id } = useParams();

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REVIEWS_SINGLE_BOOK}/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBook = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BOOK_BY_ID}/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) setSingleBook(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [updateSuccess]);

  return (
    <>
      {singleBook && (
        <div className='singleBook-page'>
          <div className='bookCard-and-btns-container'>
            <BookCard book={singleBook} />
            <div className='cart-and-admin-btns-container'>
              <CartBtn book={singleBook} />
              {user?.role === 'admin' && <UpdateBtnAdmin book={singleBook} />}
              {user?.role === 'admin' && <DeleteBtnAdmin book={singleBook} />}
            </div>
          </div>
          <div className='singleBook-admin-forms'>
            {bookToUpdate?._id === singleBook._id && (
              <div>
                <UpdateBook book={singleBook} />
              </div>
            )}
            {bookToDelete?._id === singleBook._id && (
              <div>
                <DeleteBook book={singleBook} />
              </div>
            )}
          </div>
          <div className='singleBook-details'>
            <h2>{singleBook.title}</h2>
            <p>by {singleBook.author}</p>
            <h3>Details</h3>
            <p>
              <span className='book-details-caption'> Publisher:</span>{' '}
              {singleBook.publisher}
            </p>
            <p>
              <span className='book-details-caption'>Published: </span>
              {singleBook.year}
            </p>
            <p>
              <span className='book-details-caption'> Number of pages: </span>
              {singleBook?.pages}
            </p>
            <p>
              <span className='book-details-caption'>ISBN: </span>
              {singleBook.ISBN}
            </p>
            <h3>Book description</h3>
            <p>
              {singleBook.description.split(' ').slice(0, 25).join(' ') + ' '}
              {showBookText ? (
                <>
                  <span>
                    {singleBook.description.split(' ').slice(25).join(' ') +
                      ' '}
                  </span>
                  <span
                    className='show-hide-text'
                    onClick={() => setShowBookText(false)}
                  >
                    hide
                  </span>
                </>
              ) : (
                <>
                  <span>... </span>
                  <span
                    className='show-hide-text'
                    onClick={() => setShowBookText(true)}
                  >
                    read more
                  </span>
                </>
              )}
            </p>
          </div>
          <div className='grid-placeholder'></div>
          <div className='singleBook-reviews'>
            <h3>Reviews</h3>
            {reviews.length === 0 && <p>No reviews yet...</p>}
            <div>
              {reviews &&
                reviews.map((review) => {
                  return (
                    <div key={review._id}>
                      <h4>{review?.userId?.firstName}</h4>
                      <ReviewStars rating={review.rating} />
                      <p>{review?.text}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
