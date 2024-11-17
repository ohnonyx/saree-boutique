import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { UserContext } from './UserContext'; // Import UserContext
import '../Components/Itempageyt.css';

const ItemPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object
    const { saree } = location.state || {}; // Extract saree details from the state

    const { userData } = useContext(UserContext); // Access user data from context
    const [mainImage, setMainImage] = useState(saree?.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    if (!saree) {
        return <div>Item not found.</div>;
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!userData) {
          setMessage('Please log in first to add items to the cart.');
          setTimeout(() => setMessage(''), 3000);
          return;
        }
      
        try {
          const response = await fetch('http://localhost:5000/api/user/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userData._id, // ID of the logged-in user
              itemId: saree._id,   // ID of the selected saree item
              quantity,            // Quantity to add to the cart
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setMessage(`🛒 ${quantity} ${saree.name} added to cart!`);
          } else {
            setMessage(data.message || 'Failed to update cart.');
          }
        } catch (error) {
          console.error('Error while adding to cart:', error);
          setMessage('An error occurred while adding to cart.');
        }
      
        setTimeout(() => setMessage(''), 3000);
      };
      
      
      

    return (
        <div className="productful">
            <Header />
            <div className="item-page">
                <div className="image-container">
                    <div className="sub-images-container">
                        {saree.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                onClick={() => setMainImage(image)}
                                alt={`saree${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="Main-image" data-role="imagemagnifier" data-magnifier-mode="glass">
                        <img src={mainImage} alt={saree.name} />
                    </div>
                </div>

                <div className="details-container">
                    <h1 className="Name-of-saree">{saree.name}</h1>
                    <h3 className="item-price">₹{saree.price}</h3>
                    <p className="IDitemid">Item ID : 1234</p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                        </svg> 
                            Usually Dispatches within 1 to 2 Days
                        <br></br>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                            Enter pincode for delivery date
                        <br></br>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                        </svg>
                            Easy 7 day return
                    </p>
                    <h3 className="item-details">Item-Details:</h3>
                    <table className='Details-table'>
                        <tr className="abc">
                            <td className="def"><p className="item-fabric">Fabric:</p></td>
                            <td className="def"><p>{saree.fabric}</p></td>
                        </tr >
                        <tr className="abc">
                            <td className="def"><p className="item-occasion">Occasion:</p></td>
                            <td className="def"><p>{saree.occasion}</p></td>
                        </tr>
                        <tr className="abc">
                            <td className="def"><p className="item-origin">Origin:</p></td>
                            <td className="def"><p>{saree.origin}</p></td>
                        </tr>
                        <tr className="abc">
                            <td className="def"><p className="item-craft">Craft:</p></td>
                            <td className="def"><p>{saree.craft}</p></td>
                        </tr>
                    </table>
                    <br/>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    {message && <div className="popup-message">{message}</div>}
                    <div className="quantity-control">
                        <button className="quantity-button" onClick={decrementQuantity}>
                            -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button className="quantity-button" onClick={incrementQuantity}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemPage;
