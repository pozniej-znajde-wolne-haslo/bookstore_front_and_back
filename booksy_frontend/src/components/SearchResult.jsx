import BookCard from './bookCard/BookCard';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import CartBtn from './CartBtn';
import DeleteBtnAdmin from './DeleteBtnAdmin';
import DeleteBook from './deleteBook/DeleteBook';
import UpdateBtnAdmin from './UpdateBtnAdmin';
import UpdateBook from './updateBook/UpdateBook';
import Pagination from './pagination/Pagination';
import LoadingSpinner from './loadingSpinner/LoadingSpinner';

export default function SearchResult() {
  const {
    loading,
    setLoading,
    user,
    booksToGenre,
    setBooksToGenre,
    bookToUpdate,
    bookToDelete,
    currentPage,
    setCurrentPage,
    booksPerPage,
    updateSuccess,
  } = useContext(Context);

  const queryString = new URLSearchParams(window.location.search);

  const setQueryString = () => {
    let result;
    for (const q of queryString) {
      result = q[1];
    }
    return result;
  };

  const currentUrl = setQueryString().split(' ').join('+');
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BOOK_SEARCH}/${currentUrl}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setBooksToGenre(data.data);
          setCurrentPage(1);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [updateSuccess]);

  // get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const sortedBooks = booksToGenre.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <div className='books-container'>
          {currentBooks.map((book) => (
            <div key={book._id}>
              <div className='bookCard-and-btns-container'>
                <BookCard book={book} />
                <div className='cart-and-admin-btns-container'>
                  <CartBtn book={book} />
                  {user?.role === 'admin' && <UpdateBtnAdmin book={book} />}
                  {user?.role === 'admin' && <DeleteBtnAdmin book={book} />}
                </div>
              </div>
              {bookToUpdate?._id === book._id && <UpdateBook book={book} />}
              {bookToDelete?._id === book._id && <DeleteBook book={book} />}
            </div>
          ))}
        </div>
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={booksToGenre.length}
        />
      </>
    );
  }
}
