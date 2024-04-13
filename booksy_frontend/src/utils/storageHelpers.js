export const createBasket = (book) => {
  return {
    _id: book._id,
    totalPrice: book.price,
    basketItems: [{ ...book, quantity: 1 }],
  };
};

export const createBasketItem = (book) => ({ ...book, quantity: 1 });

export const getBasketFromStorage = (key) => {
  const storage = localStorage.getItem(key);

  if (storage !== 'undefined') return JSON.parse(storage);
  return null;
};
