import { useContext } from 'react';
import { Context } from '../context/Context';
import PropTypes from 'prop-types';

export default function UpdateBtnAdmin({ book }) {
  const { bookToUpdate, setBookToUpdate, setBookToDelete } =
    useContext(Context);

  const handleBookToUpdate = () => {
    setBookToDelete(null);
    setBookToUpdate(bookToUpdate === null ? book : null);
  };

  return (
    <button className='admin-btn' onClick={handleBookToUpdate}>
      Update book
    </button>
  );
}

UpdateBtnAdmin.propTypes = {
  book: PropTypes.object.isRequired,
};
