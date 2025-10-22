import { createContext, useContext, useState, useEffect } from "react";

export const RestaurantContent = createContext(null);

export const RestaurantContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currSymbol = "KES";

  // Cart State Management
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("restaurant_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (foodItem) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item._id === foodItem._id
      );

      if (existingItemIndex >= 0) {
        // Item already exists - increase quantity
        const updatedCart = prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        return updatedCart;
      } else {
        // Item doesn't exist - add new item with quantity 1
        const updatedCart = [...prev, { ...foodItem, quantity: 1 }];
        return updatedCart;
      }
    });
  };

  // Update quantity of specific item
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  // Calculate total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // All values that will be available to components
  const value = {
    backendUrl,
    currSymbol,
    // Cart functionality
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
    getTotalItems,
  };

  return (
    <RestaurantContent.Provider value={value}>
      {props.children}
    </RestaurantContent.Provider>
  );
};

// Custom hook to use the context
export const useRestaurant = () => {
  const context = useContext(RestaurantContent);
  if (!context) {
    throw new Error(
      "useRestaurant must be used within a RestaurantContextProvider"
    );
  }
  return context;
};
