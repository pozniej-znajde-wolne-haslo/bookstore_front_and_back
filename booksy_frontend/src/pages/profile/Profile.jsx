import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReviewForm from '../../components/ReviewForm';
import UserUpdateForm from '../../components/UserUpdateForm';
import ProfilePicForm from '../../components/ProfilePicForm';
import UploadBookForm from '../../components/UploadBookForm';
import {
  fetchUserOrders,
  fetchUserReviews,
  handleDelete,
} from '../../utils/fetchFunctions';
import './_Profile.scss';

export default function Profile() {
  const {
    user,
    setUser,
    hideUpdateDeleteBookForms,
    bookToReview,
    setBookToReview,
    reviewBtn,
    setReviewBtn,
    setBasketItemsQty,
    setBasket,
  } = useContext(Context);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  // states for writing/editing reviews:
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsChange, setReviewsChange] = useState(null);
  const [renderOrders, setRenderOrders] = useState(false);
  const [showProfilePicForm, setShowProfilePicForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [activeProfileLink, setActiveProfileLink] = useState('');
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [order, setOrder] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchUserOrders(token, setUserOrders);
      fetchUserReviews(token, setUserReviews);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchUserReviews(token, setUserReviews);
    }
  }, [reviewsChange]);

  const deleteUserAccount = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      handleDelete(
        token,
        user,
        toast,
        setUser,
        setBasketItemsQty,
        setBasket,
        navigate
      );
    }
  };

  const handleProfilePic = () => {
    setActiveProfileLink('profile-pic');
    setShowEditProfile(false);
    setRenderOrders(false);
    setShowBookForm(false);
    setDeleteAccount(false);
    setShowProfilePicForm(!showProfilePicForm);
  };

  const handleEditProfile = () => {
    setActiveProfileLink('profile-edit');
    setShowProfilePicForm(false);
    setRenderOrders(false);
    setShowBookForm(false);
    setDeleteAccount(false);
    setShowEditProfile(!showEditProfile);
  };

  const handleOrderHistory = () => {
    setActiveProfileLink('orders-list');
    setShowProfilePicForm(false);
    setShowEditProfile(false);
    setShowBookForm(false);
    setDeleteAccount(false);
    setReviewBtn(null);
    setRenderOrders(!renderOrders);
  };

  const handleBookForm = () => {
    setActiveProfileLink('upload-book');
    setShowProfilePicForm(false);
    setShowEditProfile(false);
    setRenderOrders(false);
    setDeleteAccount(false);
    setShowBookForm(!showBookForm);
  };

  const showDeleteOption = () => {
    setActiveProfileLink('delete-account');
    setShowProfilePicForm(false);
    setShowEditProfile(false);
    setRenderOrders(false);
    setShowBookForm(false);
    setDeleteAccount(!deleteAccount);
  };

  return (
    <div className='profile-page'>
      <Toaster position='top-center' />

      <div className='profile-user'>
        <div className={user?.image?.thumbnail ? 'userIMG-container' : ''}>
          {user?.image?.thumbnail && (
            <img src={user?.image?.thumbnail} alt='' />
          )}
        </div>
        <div className='user-info'>
          <h2>Hey, {user?.firstName}!</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className='profile-links-wrapper'>
        <div>
          <p
            className={
              activeProfileLink === 'profile-pic'
                ? 'active-profile-link profile-link'
                : 'profile-link'
            }
            onClick={handleProfilePic}
          >
            {user?.image?.thumbnail
              ? 'Change you profile picture'
              : 'Upload profile picture'}
          </p>
          {showProfilePicForm && (
            <ProfilePicForm setShowProfilePicForm={setShowProfilePicForm} />
          )}
        </div>

        <div className='userUpdate-container'>
          <p
            className={
              activeProfileLink === 'profile-edit'
                ? 'active-profile-link profile-link'
                : 'profile-link'
            }
            onClick={handleEditProfile}
          >
            Edit your profile
          </p>
          {showEditProfile && (
            <div>
              <UserUpdateForm />
              <button
                className='cancel-btn'
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className='order-history-container'>
          <p
            className={
              activeProfileLink === 'orders-list'
                ? 'active-profile-link profile-link'
                : 'profile-link'
            }
            onClick={handleOrderHistory}
          >
            Order history
          </p>
          {renderOrders && userOrders.length === 0 && (
            <p className='zero-orders'>No orders yet..</p>
          )}
          {renderOrders && (
            <div className='orders-list'>
              {userOrders.map((item) => {
                return (
                  <>
                    <div key={item._id} className='single-order'>
                      <p className='order-date-price'>
                        <span>Date: {item.date}</span>,{' '}
                        <span>Price: {item.totalPrice}€</span>
                      </p>
                      {item.books.map((book, index) => {
                        return (
                          <>
                            <div className='order-item' key={book._id}>
                              <div className='img-container'>
                                <img
                                  onClick={() =>
                                    navigate(
                                      `/books/${book.title
                                        .split(' ')
                                        .join('_')}/${book._id}`
                                    )
                                  }
                                  src={book?.image?.thumbnail}
                                  alt='cover'
                                />
                              </div>

                              <div className='order-item-details'>
                                <p
                                  className='link-to-booksPage'
                                  onClick={() =>
                                    navigate(
                                      `/books/${book.title
                                        .split(' ')
                                        .join('_')}/${book._id}`
                                    )
                                  }
                                >
                                  &ldquo;
                                  {book?.title}
                                  &ldquo;
                                </p>
                                <p>{book?.author} </p>
                                <p>
                                  {book?.price}€, Qty: {item.quantity[index]}
                                </p>
                              </div>
                            </div>

                            {reviewBtn === book._id ? (
                              <div>
                                {bookToReview?._id === book._id &&
                                  order === item._id && (
                                    <ReviewForm
                                      book={book}
                                      setBookToReview={setBookToReview}
                                      setReviewsChange={setReviewsChange}
                                      userReviews={userReviews}
                                    />
                                  )}
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setBookToReview(book);
                                  setReviewBtn(book._id);
                                  setOrder(item._id);
                                }}
                              >
                                {userReviews.find(
                                  (rev) => rev.book === book._id
                                )
                                  ? 'Edit your review'
                                  : 'Write a review'}
                              </button>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className='single-order-underline'></div>
                  </>
                );
              })}
              <button
                className='cancel-btn'
                onClick={() => setRenderOrders(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {user?.role === 'admin' && (
          <>
            <div className='uploadBook-container'>
              <p
                className={
                  activeProfileLink === 'upload-book'
                    ? 'active-profile-link profile-link'
                    : 'profile-link'
                }
                onClick={handleBookForm}
              >
                Upload a book
              </p>
              {showBookForm && (
                <UploadBookForm setShowBookForm={setShowBookForm} />
              )}
            </div>

            <div>
              <p className='profile-link'>
                <NavLink
                  to='/books/selection'
                  onClick={hideUpdateDeleteBookForms}
                >
                  Edit book information
                </NavLink>
              </p>
            </div>
            <div>
              <p className='profile-link'>
                <NavLink
                  to='/books/selection'
                  onClick={hideUpdateDeleteBookForms}
                >
                  Remove a book from assortment
                </NavLink>
              </p>
            </div>
          </>
        )}
        <div>
          <p
            className={
              activeProfileLink === 'delete-account'
                ? 'active-profile-link profile-link'
                : 'profile-link'
            }
            onClick={showDeleteOption}
          >
            Delete your account
          </p>

          {deleteAccount && (
            <>
              <div className='delete-account'>
                <p className='confirm-delete'>
                  Do you really want to delete your account?
                </p>
              </div>
              <div className='delete-account-btns'>
                <button className='delete-btn' onClick={deleteUserAccount}>
                  Yes
                </button>
                <button
                  className='cancel-btn'
                  onClick={() => setDeleteAccount(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
