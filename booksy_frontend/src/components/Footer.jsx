import { useContext } from 'react';
import { Context } from '../context/Context';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { hideUpdateDeleteBookForms } = useContext(Context);
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {currentYear}
        <span className='footer-text'> Booksy</span>
      </p>
      <p onClick={hideUpdateDeleteBookForms}>
        <a
          href='https://github.com/pozniej-znajde-wolne-haslo/bookstore_front_and_back'
          target='_blank'
          rel='noreferrer'
        >
          <FaGithub size={23} />
        </a>
      </p>
    </footer>
  );
}
