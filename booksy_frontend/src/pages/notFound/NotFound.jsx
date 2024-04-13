import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './_NotFound.scss';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='notFound-container'>
      <h2 className='notFound-msg'> Oops!</h2>
      <p>404 - Page not found!</p>
      <button onClick={() => navigate('/')}>
        <FaHome size={18} />
        Back to Homepage
      </button>
    </div>
  );
}
