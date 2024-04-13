import { useContext } from 'react';
import { Context } from '../../context/Context';
import PropTypes from 'prop-types';
import './_Pagination.scss';

export default function Pagination({ booksPerPage, totalBooks }) {
  const { currentPage, setCurrentPage, hideUpdateDeleteBookForms } =
    useContext(Context);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  // change page
  const paginate = (pageNumber) => {
    hideUpdateDeleteBookForms();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className='pagination-container'>
        {pageNumbers.map((number) => (
          <li
            className={currentPage === number ? 'pagination-active-link' : ''}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  booksPerPage: PropTypes.number,
  totalBooks: PropTypes.number.isRequired,
};
