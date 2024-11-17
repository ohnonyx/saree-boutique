import React, { useState } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();  // Get the location object
  const { myuser } = location.state || {};
  const {jewel} = location.state || {};
  const {sarees} = location.state || {};

  // State for quantities
  const [items, setItems] = useState([
    { id: 1, name: 'jewellery name', price: 5000000, quantity: 1, imageUrl: '/jewellery.jpg' },
    { id: 2, name: 'saree name', price: 5000000, quantity: 2, imageUrl: '/whitesaree.jpg' },
  ]);

  // Function to increase quantity
  const incrementQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease quantity with confirmation prompt
  const decrementQuantity = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (item.quantity === 1) {
          const confirmDelete = window.confirm(`Are you sure you want to remove ${item.name} from the cart?`);
          if (confirmDelete) {
            return null; // Mark for deletion
          } else {
            return item; // Keep the item unchanged
          }
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item !== null)); // Remove items marked for deletion
  };

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>MY CART</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p> // Message when cart is empty
        ) : (
          items.map(item => (
            <div key={item.id} className="item">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => decrementQuantity(item.id)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && ( // Only show subtotal if there are items in the cart
        <div className="cart-subtotal">
          <h2>CART SUBTOTAL</h2>
          {items.map(item => (
            <div key={item.id} className="subtotal-item">
              <img src={item.imageUrl} alt={item.name} className="subtotal-image" />
              <div className="subtotal-details">
                <p>{item.name}</p>
                <p name="item-quantity-display">X{item.quantity}</p>
                <p>Rs.{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="total">SUBTOTAL: Rs.{subtotal}</div>
          <br/>
          
          <input className="checkout-button" type="button" value="Checkout" onClick={() => navigate('/Thankyou')} />
          
        </div>
      )}
    </div>
  );
};

export default CartPage;