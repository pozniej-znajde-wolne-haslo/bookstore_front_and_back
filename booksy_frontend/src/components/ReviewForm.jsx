import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function ReviewForm({
  book,
  setBookToReview,
  setReviewsChange,
  userReviews,
}) {
  const { user, setReviewBtn } = useContext(Context);
  const [ratingError, setRatingError] = useState('');
  const [formData, setFormData] = useState({
    review: '',
    rating: '',
  });
  const { review, rating } = formData;
  const exisitingReview = userReviews.find((rev) => rev.book === book._id);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleErrorOnFocus = () => {
    if (ratingError !== '') setRatingError('');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    let newReview;

    if (review !== '') {
      newReview = {
        book: book._id,
        text: review,
        rating: Number(rating),
        userId: user._id,
      };
    } else {
      newReview = {
        book: book._id,
        rating: Number(rating),
        userId: user._id,
      };
    }

    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const res = await fetch(`${import.meta.env.VITE_ADD_REVIEW}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify(newReview),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            toast.success('Review submitted!');
            setBookToReview(null);
            setReviewBtn(null);
            setReviewsChange(new Date());
          } else {
            setRatingError(data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditReview = async (e) => {
    e.preventDefault();
    let editedReview;
    if (review !== '' && rating !== '') {
      editedReview = {
        text: review,
        rating: Number(rating),
      };
    } else if (review !== '' && rating === '') {
      editedReview = { text: review };
    } else if (rating !== '' && review === '') {
      editedReview = { rating: Number(rating) };
    } else {
      setRatingError('Please enter your new rating');
    }

    if (editedReview) {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          const reviewToEdit = userReviews.find((rev) => rev.book === book._id);
          const res = await fetch(
            `${import.meta.env.VITE_EDIT_REVIEW}/${reviewToEdit._id}`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', token: token },
              body: JSON.stringify(editedReview),
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              toast.success('Review updated!');
              setBookToReview(null);
              setReviewBtn(null);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className='review-form'
      onSubmit={(e) =>
        exisitingReview ? handleEditReview(e) : handleAddReview(e)
      }
    >
      <Toaster position='top-center' />
      <p className='rating-caption'>
        {exisitingReview ? 'New rating' : 'Your rating'}
      </p>
      {ratingError !== '' && <p className='error-msg'>{ratingError}</p>}
      <div className='rating-options-container'>
        <div className='rating-option'>
          <input
            type='radio'
            name='rating'
            value='1'
            onChange={onChange}
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='1'>1</label>
        </div>
        <div className='rating-option'>
          <input
            type='radio'
            name='rating'
            value='2'
            onChange={onChange}
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='2'>2</label>
        </div>
        <div className='rating-option'>
          <input
            type='radio'
            name='rating'
            value='3'
            onChange={onChange}
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='3'>3</label>
        </div>
        <div className='rating-option'>
          <input
            type='radio'
            name='rating'
            value='4'
            onChange={onChange}
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='4'>4</label>
        </div>
        <div className='rating-option'>
          <input
            type='radio'
            name='rating'
            value='5'
            onChange={onChange}
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='5'>5</label>
        </div>
      </div>

      <textarea
        name='review'
        id='review'
        cols='30'
        rows='7'
        placeholder={
          exisitingReview
            ? 'write your new review here'
            : 'write your review here'
        }
        onChange={onChange}
      ></textarea>
      <div className='review-btns-container'>
        <button>Send</button>
        <button
          type='reset'
          className='cancel-btn'
          onClick={() => {
            setBookToReview(null);
            setReviewBtn(null);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  book: PropTypes.object,
  setBookToReview: PropTypes.func,
  setReviewsChange: PropTypes.func,
  userReviews: PropTypes.array,
};
