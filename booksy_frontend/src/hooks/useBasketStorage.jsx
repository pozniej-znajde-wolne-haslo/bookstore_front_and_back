import { useContext, useEffect, useReducer } from 'react';
import { createBasket, createBasketItem } from '../utils/storageHelpers';
import { Context } from '../context/Context';

const key = 'basket';

export const useBasketStorage = () => {
  const { basket, setBasket, basketItemsQty, setBasketItemsQty } =
    useContext(Context);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(basket));
    forceUpdate();
  }, [basket]);

  const persistToStorage = (book) => {
    if (basket) {
      let newBasket = basket;

      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === book._id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity += 1;
      } else {
        newBasket = {
          ...basket,
          basketItems: [...basket.basketItems, createBasketItem(book)],
        };
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
      setBasketItemsQty(basketItemsQty + 1);
    } else {
      setBasket(createBasket(book));
      setBasketItemsQty(basketItemsQty + 1);
    }
  };

  const removeFromBasket = (id) => {
    if (basket) {
      let newBasket = basket;

      const itemToRemoveIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === id
      );

      if (itemToRemoveIndex !== -1) {
        setBasketItemsQty(
          basketItemsQty - basket.basketItems[itemToRemoveIndex].quantity
        );
      }

      const updatedBasketItems = basket.basketItems.filter(
        (book) => book._id !== id
      );

      if (updatedBasketItems) {
        newBasket = {
          ...basket,
          basketItems: updatedBasketItems,
        };
      }

      const totalPrice = updatedBasketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
    }
  };

  const decreaseQuantity = (id) => {
    if (basket) {
      let newBasket = basket;
      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity -= 1;
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
      setBasketItemsQty(basketItemsQty - 1);
    }
  };

  const increaseQuantity = (id) => {
    if (basket) {
      let newBasket = basket;
      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity += 1;
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
      setBasketItemsQty(basketItemsQty + 1);
    }
  };

  return {
    basket,
    persistToStorage,
    removeFromBasket,
    decreaseQuantity,
    increaseQuantity,
  };
};
