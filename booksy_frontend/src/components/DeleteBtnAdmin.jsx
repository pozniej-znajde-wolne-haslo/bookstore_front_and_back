import { useContext } from 'react';
import { Context } from '../context/Context';
import PropTypes from 'prop-types';

export default function DeleteBtnAdmin({ book }) {
  const { bookToDelete, setBookToDelete, setBookToUpdate } =
    useContext(Context);

  const handleBookToDel = () => {
    setBookToUpdate(null);
    setBookToDelete(bookToDelete === null ? book : null);
  };

  return (
    <button className='admin-btn' onClick={handleBookToDel}>
      Delete book
    </button>
  );
}

DeleteBtnAdmin.propTypes = {
  book: PropTypes.object.isRequired,
};
