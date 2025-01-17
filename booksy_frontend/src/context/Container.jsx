import { useEffect, useState } from 'react';
import { Context } from './Context';
import { getBasketFromStorage } from '../utils/storageHelpers';
import PropTypes from 'prop-types';

const key = 'basket';

export default function Container({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [searchResult, setSearchResult] = useState([]);
  const [booksToGenre, setBooksToGenre] = useState([]);
  const [orderReceived, setOrderReceived] = useState('');
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [bookToReview, setBookToReview] = useState(null);
  const [reviewBtn, setReviewBtn] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [basket, setBasket] = useState(getBasketFromStorage(key));
  const [basketItemsQty, setBasketItemsQty] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      verifyToken(token, setUser);
    }
  }, []);

  const hideUpdateDeleteBookForms = () => {
    setBookToUpdate(null);
    setBookToDelete(null);
  };

  return (
    <>
      <Context.Provider
        value={{
          loading,
          setLoading,
          user,
          setUser,
          books,
          setBooks,
          currentPage,
          setCurrentPage,
          booksPerPage,
          searchResult,
          setSearchResult,
          booksToGenre,
          setBooksToGenre,
          basket,
          setBasket,
          basketItemsQty,
          setBasketItemsQty,
          orderReceived,
          setOrderReceived,
          bookToDelete,
          setBookToDelete,
          bookToUpdate,
          setBookToUpdate,
          hideUpdateDeleteBookForms,
          bookToReview,
          setBookToReview,
          reviewBtn,
          setReviewBtn,
          updateSuccess,
          setUpdateSuccess,
          verifyToken,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

const verifyToken = async (token, state) => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}/api/user/verifytoken`,
      {
        method: 'GET',
        headers: { token: token },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        state(data.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

Container.propTypes = {
  children: PropTypes.any,
};
