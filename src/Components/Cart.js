import React, { useState, useEffect, useContext } from 'react';
import './CartPage.css';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const CartPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { userId } = useContext(UserContext); // Get userId from context
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch user cart data from the server
        const userResponse = await fetch(`http://localhost:5000/api/user?userId=${userId}`);
        
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }
    
        const userData = await userResponse.json();
        console.log("User data:", userData); // Debugging: log the user data
    
        if (!userData || !userData.cart || userData.cart.length === 0) {
          console.error('User not found or cart empty');
          setError('Your cart is empty');
          return;
        }
    
        // Now, fetch items from inventory and jewellery
        const inventoryItems = [];
        const jewelleryItems = [];
    
        for (const cartItem of userData.cart) {
          const itemId = cartItem.itemId;  // Access itemId directly from cartItem
          const quantity = cartItem.quantity;  // Access quantity directly from cartItem
    
          // Fetch inventory item
          const inventoryResponse = await fetch(`http://localhost:5000/api/inventory/${itemId}`);
          if (!inventoryResponse.ok) {
            console.error(`Failed to fetch inventory item with ID: ${itemId}`);
            const jewelleryResponse = await fetch(`http://localhost:5000/api/jewellery/${itemId}`);
            if (!jewelleryResponse.ok) {
              console.error(`Failed to fetch jewellery item with ID: ${itemId}`);
              continue; // Skip this item if both inventory and jewellery fail
            }
            const jewelleryItem = await jewelleryResponse.json();
            if (jewelleryItem) {
              jewelleryItems.push({ ...jewelleryItem, quantity });
            }
          } else {
            const inventoryItem = await inventoryResponse.json();
            if (inventoryItem) {
              inventoryItems.push({ ...inventoryItem, quantity });
            }
          }
        }
    
        // Merge the items and update the state
        setItems([...inventoryItems, ...jewelleryItems]);
    
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items. Please try again later.');
      }
    };

    if (userId) {
      fetchCartItems();
    } else {
      navigate('/Login');
    }
  }, [userId]); // Refetch when userId changes

  // Function to increase quantity
  const incrementQuantity = (id) => {
    setItems(items.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease quantity with confirmation prompt
  const decrementQuantity = (id) => {
    setItems(items.map(item => {
      if (item._id === id) {
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
        {error && <p className="error">{error}</p>}
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="item">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => decrementQuantity(item._id)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => incrementQuantity(item._id)}>+</button>
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
            <div key={item._id} className="subtotal-item">
              <img src={item.images[0]} alt={item.name} className="subtotal-image" />
              <div className="subtotal-details">
                <p>{item.name}</p>
                <p>X{item.quantity}</p>
                <p>Rs.{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="total">SUBTOTAL: Rs.{subtotal}</div>
          <br />
          <input className="checkout-button" type="button" value="Checkout" onClick={() => navigate('/Thankyou')} />
        </div>
      )}
    </div>
  );
};

export default CartPage;

 