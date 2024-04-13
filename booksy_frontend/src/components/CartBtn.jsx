import { useContext } from 'react';
import { Context } from '../context/Context';
import { useBasketStorage } from '../hooks/useBasketStorage';
import PropTypes from 'prop-types';

export default function CartBtn({ book }) {
  const { hideUpdateDeleteBookForms } = useContext(Context);
  const { persistToStorage } = useBasketStorage();

  const handleClick = () => {
    persistToStorage(book);
    hideUpdateDeleteBookForms();
  };

  return (
    <button className='cart-btn' onClick={handleClick}>
      Add to Cart
    </button>
  );
}

CartBtn.propTypes = {
  book: PropTypes.object,
};
