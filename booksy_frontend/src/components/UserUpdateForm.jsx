import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserUpdateForm() {
  const { user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    lastName: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  const { lastName, email, password, reenterPassword } = formData;
  const [errorReEnterPW, setErrorReEnterPW] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleErrorsOnFocus = () => setErrorReEnterPW('');

  const handleUserUpdate = (e) => {
    e.preventDefault();

    if (password !== '' && password !== reenterPassword) {
      setErrorReEnterPW('Please make sure to enter the same password as above');
    } else {
      const token = sessionStorage.getItem('token');
      let userData = {};

      if (token) {
        if (lastName !== '') userData = { lastName: lastName };
        if (email !== '') userData = { email: email };
        if (password !== '') userData = { password: password };

        if (token) {
          if (userData?.password) {
            fetch(`${import.meta.env.VITE_USER_UPDATE}/${user._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', token: token },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success) {
                  setFormData({
                    lastName: '',
                    email: '',
                    password: '',
                    reenterPassword: '',
                  });
                  toast.success('Profile updated successfully!');
                  setTimeout(() => {
                    setUser(null);
                    sessionStorage.removeItem('token');
                    navigate('/login');
                  }, 2000);
                }
              })
              .catch((err) => console.log(err));
          } else {
            fetch(`${import.meta.env.VITE_USER_UPDATE}/${user._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', token: token },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success) {
                  setFormData({
                    lastName: '',
                    email: '',
                    password: '',
                    reenterPassword: '',
                  });
                  toast.success('Profile updated successfully!');
                  setUser(res.data);
                }
              })
              .catch((err) => console.log(err));
          }
        }
      }
    }
  };

  return (
    <div className='userUpdate-forms-container'>
      <Toaster position='top-center' />
      <form onSubmit={handleUserUpdate}>
        <legend>Change last name</legend>
        <div className='input-btn-wrapper'>
          <input
            type='text'
            placeholder='Last name'
            id='lastName'
            value={lastName}
            onChange={onChange}
            onFocus={handleErrorsOnFocus}
          />
          <button>Send</button>
        </div>
      </form>
      <form onSubmit={handleUserUpdate}>
        <legend>Change email address</legend>
        <div className='input-btn-wrapper'>
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
            onFocus={handleErrorsOnFocus}
          />
          <button>Send</button>
        </div>
      </form>
      <form onSubmit={handleUserUpdate}>
        <legend>Change password</legend>
        <div className='input-btn-wrapper'>
          <div className='inputs-wrapper'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
              onFocus={handleErrorsOnFocus}
            />

            {errorReEnterPW && <p className='error-msg'>{errorReEnterPW}</p>}
            <input
              type='password'
              placeholder='Renter password'
              id='reenterPassword'
              value={reenterPassword}
              onChange={onChange}
              onFocus={handleErrorsOnFocus}
            />
          </div>

          <button>Send</button>
        </div>
      </form>
    </div>
  );
}
