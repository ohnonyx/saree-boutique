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
                    <h3 className="item-details">Item-Details:</h3>
                    <table className="Details-table">
                        <tbody>
                            <tr>
                                <td className="def">Fabric:</td>
                                <td>{saree.fabric}</td>
                            </tr>
                            <tr>
                                <td className="def">Occasion:</td>
                                <td>{saree.occasion}</td>
                            </tr>
                            <tr>
                                <td className="def">Origin:</td>
                                <td>{saree.origin}</td>
                            </tr>
                            <tr>
                                <td className="def">Craft:</td>
                                <td>{saree.craft}</td>
                            </tr>
                        </tbody>
                    </table>
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
