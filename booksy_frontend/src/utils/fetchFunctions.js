// fetch orders by userId
export const fetchUserOrders = async (token, state) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_USER_ORDERS}`, {
      method: 'GET',
      headers: { token: token },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        state(data.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// fetch reviews by userId
export const fetchUserReviews = async (token, state) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REVIEWS_BY_USER_ID}`, {
      method: 'GET',
      headers: { token: token },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) state(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// delete user account
export const handleDelete = async (
  token,
  user,
  popUp,
  state,
  resetBasketQty,
  resetBasket,
  navigate
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DELETE_USER}/${user._id}`,
      { method: 'DELETE', headers: { token: token } }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        popUp.success(data.message);
        setTimeout(() => {
          state(null);
          sessionStorage.removeItem('token');
          resetBasketQty(0);
          resetBasket(null);
          localStorage.removeItem('basket');
          navigate('/');
        }, 2500);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
