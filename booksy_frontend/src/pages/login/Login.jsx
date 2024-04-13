import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import './_Login.scss';

export default function Login() {
  const { setUser, basket } = useContext(Context);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleErrorsOnFlocus = () => {
    setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };

    fetch(`${import.meta.env.VITE_LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        const token = res.headers.get('token');
        if (token) {
          sessionStorage.setItem('token', token);
        }
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          navigate(basket?.basketItems ? '/checkout' : '/profile');
        } else {
          setLoginError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-page'>
      <div className='form-container'>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          {loginError === 'Please make sure your email is correct' && (
            <p>{loginError}</p>
          )}
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
            onFocus={handleErrorsOnFlocus}
          />

          {loginError === 'Please make sure your password is correct' && (
            <p>{loginError}</p>
          )}
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={onChange}
            onFocus={handleErrorsOnFlocus}
          />
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
}
