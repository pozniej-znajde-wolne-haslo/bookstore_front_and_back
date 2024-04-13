import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function UploadBookForm({ setShowBookForm }) {
  const uploadBook = async (e) => {
    e.preventDefault();
    try {
      const book = new FormData(e.target);
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_UPLOAD_BOOK}`, {
          method: 'POST',
          headers: { token: token },
          body: book,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            toast.success('Book uploaded successfully!');
            e.target.reset();
            setShowBookForm(false);
          }
        } else {
          toast.error('Make sure to fill out all the fields.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='upload-book-form' onSubmit={uploadBook}>
      <Toaster position='top-center' />
      <div className='form-section'>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' id='title' />
      </div>
      <div className='form-section'>
        <label className='combinedName-label' htmlFor='combinedName'>
          Author
        </label>
        <input
          className='combinedName-input'
          type='text'
          name='combinedName'
          id='combinedName'
        />
      </div>
      <div className='form-section'>
        <label htmlFor='year'>Year</label>
        <input type='number' name='year' id='year' />
      </div>
      <div className='form-section'>
        <label htmlFor='publisher'>Publisher</label>
        <input type='text' name='publisher' id='publisher' />
      </div>
      <div className='form-section'>
        <label htmlFor='genre'>Genre</label>
        <input type='text' name='genre' id='genre' />
      </div>
      <div className='form-section'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'
        ></textarea>
      </div>
      <div className='form-section'>
        <label htmlFor='pages'>Number of pages</label>
        <input type='number' step='any' name='pages' id='pages' />
      </div>
      <div className='form-section'>
        <label htmlFor='price'>Price</label>
        <input type='number' step='any' name='price' id='price' />
      </div>
      <div className='form-section'>
        <label htmlFor='isbn'>ISBN</label>
        <input type='text' name='isbn' id='isbn' />
      </div>
      <div className='form-section'>
        <label className='image-label' htmlFor='image'>
          Image
        </label>
        <input className='image-input' type='file' name='image' id='image' />
      </div>
      <div className='uploadBook-btns-container'>
        <button className='upload-btn'>Send</button>

        <button
          type='reset'
          className='cancel-btn'
          onClick={() => setShowBookForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

UploadBookForm.propTypes = {
  setShowBookForm: PropTypes.func,
};
