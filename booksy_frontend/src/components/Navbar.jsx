import { useContext, useState } from 'react';
import { PiShoppingCartSimple, PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FaBars } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import Modal from './Modal';
import BooksyLogo from '../assets/BooksyLogo';

export default function Navbar() {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    setCurrentPage,
    hideUpdateDeleteBookForms,
    setBasket,
    basketItemsQty,
    setBasketItemsQty,
  } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [basketLinkActive, setBasketLinkActive] = useState(false);

  const handleBooksDisplay = () => {
    setCurrentPage(1);
    hideUpdateDeleteBookForms();
    navigate('/books');
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    setBasketItemsQty(0);
    setBasket(null);
    localStorage.removeItem('basket');
    setBasketLinkActive(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header>
      <nav>
        <div
          className='shop-logo-container'
          onClick={() => {
            hideUpdateDeleteBookForms;
            navigate('/');
          }}
        >
          <div className='shop-icon'>
            <BooksyLogo />
          </div>
          <p className='shop-name'>Booksy</p>
        </div>

        <div className='burger-menu'>
          <NavLink to='/cart'>
            <PiShoppingCartSimple size={23} />
            <span className='basket-qty'>
              {basketItemsQty > 0 && basketItemsQty}
            </span>
          </NavLink>
          <FaBars size={24} color={'#3c4f58'} onClick={toggleModal} />
        </div>

        {showModal && (
          <Modal
            toggleModal={toggleModal}
            basketLinkActive={basketLinkActive}
            setBasketLinkActive={setBasketLinkActive}
          />
        )}

        <ul className='desktop-links'>
          <li
            onClick={() => {
              hideUpdateDeleteBookForms;
              setBasketLinkActive(false);
            }}
          >
            <NavLink to='/'>Home</NavLink>
          </li>
          <li
            onClick={() => {
              handleBooksDisplay;
              setBasketLinkActive(false);
            }}
          >
            <NavLink to='/books'>Books</NavLink>
          </li>
          <li
            id='basket-icon'
            onClick={() => {
              hideUpdateDeleteBookForms;
              setBasketLinkActive(true);
            }}
          >
            <NavLink to='/cart'>
              {basketLinkActive ? (
                <>
                  <PiShoppingCartSimpleBold size={22} />{' '}
                  <span className='basket-qty'>
                    {basketItemsQty > 0 && basketItemsQty}
                  </span>
                </>
              ) : (
                <>
                  <PiShoppingCartSimple size={20} />
                  <span className='basket-qty'>
                    {basketItemsQty > 0 && basketItemsQty}
                  </span>
                </>
              )}
            </NavLink>
          </li>

          {!user ? (
            <>
              <li onClick={() => setBasketLinkActive(false)}>
                <NavLink to='/register'>Register</NavLink>
              </li>
              <li onClick={() => setBasketLinkActive(false)}>
                <NavLink to='/login'>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  hideUpdateDeleteBookForms;
                  setBasketLinkActive(false);
                }}
              >
                <NavLink to='/profile'>Profile</NavLink>
              </li>

              <li onClick={logout}>
                <NavLink to='/login'>Logout</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
