import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import PropTypes from 'prop-types';
import './_DeleteBook.scss';

export default function DeleteBook({ book }) {
  const { setBookToDelete, updateSuccess, setUpdateSuccess } =
    useContext(Context);
  const [deleteMSG, setDeleteMSG] = useState('');

  const handleDeleteMode = () => setBookToDelete(null);

  const deleteBook = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_DELETE_BOOK}/${book._id}`, {
        method: 'DELETE',
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setDeleteMSG(res.message);

            setTimeout(() => {
              setBookToDelete(null);
              setDeleteMSG('');
              setUpdateSuccess(updateSuccess ? false : true);
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='deleteBook-container'>
      {deleteMSG && <p className='update-delete-msg'>{deleteMSG}</p>}

      <p className='confirm-delete'>
        Are you sure you want to remove this book from the shop&apos;s database?
      </p>
      <div className='deleteBook-btns-container'>
        <button
          className='btn-primary btn-steelblue delete-btn'
          onClick={deleteBook}
        >
          Yes
        </button>
        <button className=' btn-primary btn-magenta' onClick={handleDeleteMode}>
          Cancel
        </button>
      </div>
    </div>
  );
}

DeleteBook.propTypes = {
  book: PropTypes.object.isRequired,
};
