import { useContext } from 'react';
import { Context } from '../context/Context';
import PropTypes from 'prop-types';

export default function ProfilePicForm({ setShowProfilePicForm }) {
  const { user, setUser } = useContext(Context);

  const handleUploadPic = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_USER_UPDATE}/${user._id}`, {
        method: 'PATCH',
        headers: { token: token },
        body: new FormData(e.target),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setUser(res.data);
            setShowProfilePicForm(false);
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <form className='profile-pic-form' onSubmit={handleUploadPic}>
        <input type='file' name='image' id='image' />
        <button>Send</button>
      </form>
      <button
        type='reset'
        className='cancel-btn'
        onClick={() => setShowProfilePicForm(false)}
      >
        Cancel
      </button>
    </>
  );
}

ProfilePicForm.propTypes = {
  setShowProfilePicForm: PropTypes.func,
};
