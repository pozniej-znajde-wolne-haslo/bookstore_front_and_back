import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useBasketStorage } from '../../hooks/useBasketStorage';
import { IoMdArrowUp, IoMdArrowDown } from 'react-icons/io';
import './_Cart.scss';

export default function Cart() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { basket, removeFromBasket, decreaseQuantity, increaseQuantity } =
    useBasketStorage();

  const redirectToCheckout = () => navigate('/checkout');
  const redirectToLogin = () => navigate('/login');

  return (
    <div className='basket-page'>
      <h2>Basket</h2>

      {!basket /* || basket === 'undefined' */ ||
      basket.basketItems.length === 0 ? (
        <p className='basket-caption'>Your basket is empty.</p>
      ) : (
        <div>
          <p className='basket-caption'>
            Total price: {basket?.totalPrice.toFixed(2)}€
          </p>
          {basket?.basketItems.map((book) => {
            return (
              <div className='basket-item-container' key={book._id}>
                <div className='basket-item'>
                  <div className='basketIMG-container'>
                    <img src={book.image?.thumbnail} alt='book cover' />
                  </div>
                  <div className='basket-item-details'>
                    <p>&ldquo;{book.title}&ldquo;</p>
                    <p>{book.author}</p>
                    <p>{book.price}€</p>
                    <p className='qty-p'>
                      Qty:
                      <span
                        className='arrow-btn'
                        onClick={() =>
                          book.quantity > 1 && decreaseQuantity(book._id)
                        }
                      >
                        <IoMdArrowDown />
                      </span>
                      {book.quantity}
                      <span
                        className='arrow-btn'
                        onClick={() =>
                          book.quantity < 10 && increaseQuantity(book._id)
                        }
                      >
                        <IoMdArrowUp />
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  className='delete-btn'
                  onClick={() => removeFromBasket(book._id)}
                >
                  Remove Item
                </button>
              </div>
            );
          })}

          {basket.length !== 0 && (
            <button
              className='checkout-btn'
              onClick={user ? redirectToCheckout : redirectToLogin}
            >
              Go to Checkout
            </button>
          )}
          {/*  <button
            className='checkout-btn'
            onClick={user ? redirectToCheckout : redirectToLogin}
          >
            Go to Checkout
          </button> */}
        </div>
      )}
    </div>
  );
}
