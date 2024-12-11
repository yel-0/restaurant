import React, { createContext, useContext, useState, useEffect } from "react";

const OrderCartContext = createContext();

export const OrderCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("orderCartItems"));
    if (storedCart && storedCart.length > 0) {
      console.log("Loaded Cart from localStorage:", storedCart);
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    console.log("Saving Cart to localStorage:", cartItems);
    localStorage.setItem("orderCartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (itemIndex > -1) {
        return prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <OrderCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </OrderCartContext.Provider>
  );
};

export const useOrderCart = () => {
  return useContext(OrderCartContext);
};
