import React, { useState, createContext } from 'react';
import { RoutesforPage } from './Routes';
import './App.css';

// Create a Context for the cart state
export const CartContext = createContext();

function App() {
  const [addToCart, setAddToCart] = useState(0); // Initialize addToCart state

  return (
    // Provide the CartContext to the entire app
    <CartContext.Provider value={{ addToCart, setAddToCart }}>
      <RoutesforPage />
    </CartContext.Provider>
  );
}

export default App;
