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
      const itemIndex = prevItems.findIndex((i) => i._id === item._id); // Changed 'id' to '_id'

      if (itemIndex > -1) {
        return prevItems.map((existingItem, index) =>
          index === itemIndex
            ? { ...existingItem, quantity: existingItem.quantity + quantity }
            : existingItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item._id === itemId); // Changed 'id' to '_id'

      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        const item = updatedItems[itemIndex];

        // Ensure quantity doesn't go below 1
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          item.quantity = 1;
        }

        updatedItems[itemIndex] = item;
        return updatedItems;
      }
      return prevItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    ); // Changed 'id' to '_id'
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <OrderCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </OrderCartContext.Provider>
  );
};

export const useOrderCart = () => {
  return useContext(OrderCartContext);
};
