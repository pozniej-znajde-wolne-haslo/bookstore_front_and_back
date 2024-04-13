import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import PropTypes from 'prop-types';
import './_UpdateBook.scss';

export default function UpdateBook({ book }) {
  const { setBookToUpdate, updateSuccess, setUpdateSuccess } =
    useContext(Context);
  const [updateMSGcover, setUpdateMSGcover] = useState('');
  const [updateMSGbookInfo, setUpdateMSGbookInfo] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: 0,
    publisher: '',
    genre: '',
    description: '',
    pages: 0,
    price: 0,
    isbn: '',
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCancel = () => setBookToUpdate(null);
  const resetErrorMSGs = () => {
    setUpdateMSGcover('');
    setUpdateMSGbookInfo('');
  };

  const handleNewBookImg = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (token) {
      if (e.target?.image?.value) {
        fetch(`${import.meta.env.VITE_UPDATE_BOOK}/${book._id}`, {
          method: 'PATCH',
          headers: { token: token },
          body: new FormData(e.target),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setUpdateMSGcover(res.message);
              setTimeout(() => {
                setBookToUpdate(null);
                setUpdateMSGcover('');
                setUpdateSuccess(updateSuccess ? false : true);
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setUpdateMSGcover('Please choose an image and try again.');
      }
    }
  };

  const updateBook = (e) => {
    e.preventDefault();

    const updatedBook = {
      title: formData.title,
      author: formData.author,
      year: formData.year,
      publisher: formData.publisher,
      genre: formData.genre,
      description: formData.description,
      pages: formData.pages,
      price: formData.price,
      ISBN: formData.isbn,
    };

    if (
      formData.title === '' &&
      formData.author === '' &&
      formData.publisher === '' &&
      formData.genre === '' &&
      formData.description === '' &&
      formData.isbn === '' &&
      formData.year === 0 &&
      formData.pages === 0 &&
      formData.price === 0
    ) {
      setUpdateMSGbookInfo(
        'Please enter the information you wish to update and try again.'
      );
    } else {
      const token = sessionStorage.getItem('token');
      if (token) {
        fetch(`${import.meta.env.VITE_UPDATE_BOOK}/${book._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify(updatedBook),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setUpdateMSGbookInfo(res.message);
              setTimeout(() => {
                setBookToUpdate(null);
                setUpdateMSGbookInfo('');
                setUpdateSuccess(updateSuccess ? false : true);
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className='updateBook-container'>
      <form className='updateBook-img-form' onSubmit={handleNewBookImg}>
        {updateMSGcover && (
          <p className='update-delete-msg'>{updateMSGcover}</p>
        )}
        <legend className='updateBook-legend'>Upload new book image</legend>
        <input type='file' name='image' id='image' onFocus={resetErrorMSGs} />
        <div className='updateBook-btns-container'>
          <button
            type='button'
            className='btn-primary btn-magenta'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='btn-primary btn-steelblue'
            onClick={resetErrorMSGs}
          >
            Send
          </button>
        </div>
      </form>

      <form className='updateBook-details-form' onSubmit={updateBook}>
        {updateMSGbookInfo && (
          <p className='update-delete-msg'>{updateMSGbookInfo}</p>
        )}
        <legend className='updateBook-legend'>Update book details</legend>
        <div className='form-section'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            name='author'
            id='author'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='year'>Year</label>
          <input
            type='number'
            name='year'
            id='year'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='publisher'>Publisher</label>
          <input
            type='text'
            name='publisher'
            id='publisher'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='genre'>Genre</label>
          <input
            type='text'
            name='genre'
            id='genre'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols='23'
            rows='4'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          ></textarea>
        </div>
        <div className='form-section'>
          <label htmlFor='pages'>Number of pages</label>
          <input
            type='number'
            step='any'
            name='pages'
            id='pages'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            step='any'
            name='price'
            id='price'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='isbn'>ISBN</label>
          <input
            type='text'
            name='isbn'
            id='isbn'
            onChange={onChange}
            onFocus={resetErrorMSGs}
          />
        </div>
        <div className='updateBook-btns-container'>
          <button
            type='reset'
            className='btn-primary btn-magenta'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='btn-primary btn-steelblue'
            onFocus={resetErrorMSGs}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

UpdateBook.propTypes = {
  book: PropTypes.object.isRequired,
};
