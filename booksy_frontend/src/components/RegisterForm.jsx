import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function RegisterForm() {
  const { user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  const { firstName, lastName, email, password, reenterPassword } = formData;
  const [errorMSGs, setErrorMSGs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorReEnterPW, setErrorReEnterPW] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleErrorsOnFlocus = () => {
    setErrorMSGs({ firstName: '', lastName: '', email: '', password: '' });
    setErrorReEnterPW('');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.reenterPassword.value) {
      setErrorReEnterPW('Please make sure to enter the same password as above');
    }
    if (e.target.password.value === e.target.reenterPassword.value) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      fetch(`${import.meta.env.VITE_REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          const token = res?.headers.get('token');
          if (token) sessionStorage.setItem('token', token);
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            toast.success('Registration successful!');
            setUser(res.data);
            setTimeout(() => navigate('/profile'), 2500);
          } else {
            setErrorMSGs(
              res.message.errors.reduce((acc, item) => {
                acc[item.path] = item.msg;
                return acc;
              }, {})
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();

    if (
      password &&
      e.target.password.value !== e.target.reenterPassword.value
    ) {
      setErrorReEnterPW(
        'Please make sure to enter the same password as above.'
      );
    }

    const token = sessionStorage.getItem('token');

    if (token) {
      fetch(`${import.meta.env.VITE_USER_UPDATE}/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success('Profile updated successfully!');
            setUser(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Toaster position='top-center' />
      <form onSubmit={user ? handleUserUpdate : handleRegister}>
        {errorMSGs.firstName !== '' && <p>{errorMSGs.firstName}</p>}
        <input
          type='text'
          placeholder='First name'
          id='firstName'
          value={firstName}
          onChange={onChange}
          onFocus={handleErrorsOnFlocus}
        />

        {errorMSGs.lastName && <p>{errorMSGs.lastName}</p>}
        <input
          type='text'
          placeholder='Last name'
          id='lastName'
          value={lastName}
          onChange={onChange}
          onFocus={handleErrorsOnFlocus}
        />

        {errorMSGs.email && <p>{errorMSGs.email}</p>}
        <input
          type='email'
          placeholder='Email'
          id='email'
          value={email}
          onChange={onChange}
          onFocus={handleErrorsOnFlocus}
        />

        {errorMSGs.password && <p>{errorMSGs.password}</p>}
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={onChange}
          onFocus={handleErrorsOnFlocus}
        />

        {errorReEnterPW && <p>{errorReEnterPW}</p>}
        <input
          type='password'
          placeholder='Renter password'
          id='reenterPassword'
          value={reenterPassword}
          onChange={onChange}
          onFocus={handleErrorsOnFlocus}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterForm;
