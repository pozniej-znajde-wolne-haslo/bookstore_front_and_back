import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function AddressForm({ showAddressForm, setShowAddressForm }) {
  const { user, setUser, verifyToken } = useContext(Context);
  const [formData, setFormData] = useState({
    street: '',
    zip: '',
    city: '',
    country: '',
  });
  const { street, zip, city, country } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');
    if (token) {
      const userData = {
        street,
        zip,
        city,
        country,
      };

      fetch(`${import.meta.env.VITE_USER_UPDATE}/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', token: token },
        body: JSON.stringify({ address: userData }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success('Address saved!');
            e.target.reset();
            setShowAddressForm(false);
            setUser(res.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      verifyToken(token, setUser);
    }
  }, [showAddressForm]);

  return (
    <>
      <Toaster position='top-center' />
      <form className='address-form' onSubmit={handleAddressSubmit}>
        <input
          type='text'
          name='street'
          id='street'
          placeholder='Street name'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='zip'
          id='zip'
          placeholder='Zip code'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='city'
          id='city'
          placeholder='City'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='country'
          id='country'
          placeholder='Country'
          required
          onChange={onChange}
        />
        <button>Save</button>
      </form>
    </>
  );
}

AddressForm.propTypes = {
  showAddressForm: PropTypes.bool,
  setShowAddressForm: PropTypes.func,
};
