import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const persist = (data) => {
    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const addToCart = (item) => {
    const updated = [...cart, item];
    persist(updated);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    persist(updated);
  };

  const clearCart = () => {
    persist([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
