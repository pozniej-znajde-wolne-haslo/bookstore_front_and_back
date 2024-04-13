import { Context } from '../context/Context';
import BooksDisplay from './BooksDisplay';
import Pagination from './pagination/Pagination';
import { useEffect, useContext } from 'react';

export default function Selection() {
  const { books, setBooks, currentPage, booksPerPage, updateSuccess } =
    useContext(Context);

  const handleBookFetch = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_FETCH_ALL_BOOKS}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) setBooks(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleBookFetch();
  }, []);

  useEffect(() => {
    handleBookFetch();
  }, [updateSuccess]);

  // get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const sortedBooks = books.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <BooksDisplay books={currentBooks} />
      <Pagination booksPerPage={booksPerPage} totalBooks={books.length} />
    </>
  );
}
