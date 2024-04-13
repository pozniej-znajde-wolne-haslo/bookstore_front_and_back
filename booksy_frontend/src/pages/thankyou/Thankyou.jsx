import { useContext } from 'react';
import { Context } from '../../context/Context';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './_Thankyou.scss';

export default function ThankYou() {
  const { orderReceived } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className='thankyou-page'>
      <div className='thankyou-container'>
        <div className='thankyou-content'>
          <h2>{orderReceived}</h2>
          <p>Thank you for choosing our shop!</p>
          <button onClick={() => navigate('/')}>
            <FaHome />
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
