import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import '../Components/Itempagejewels.css';
import Footer from './Footer';

const ItemPage = () => {
    const navigate = useNavigate();
    const handleSareeClick = (saree) => {
        navigate('/itempage', { state: { jewel: saree } });  // Ensure saree is passed here
    };

    const location = useLocation();  // Get the location object
    console.log(location.state);
    const { item, type } = location.state || {};  // Extract the item (saree/jewel) and type from state

    const { jewel } = location.state || {};  // Extract the jewel details from the state
    const [mainImage, setMainImage] = useState(jewel.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    if (!jewel) {
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

    const handleAddToCart = () => {
        setMessage(`🪞🪷 ${quantity} ${jewel.name} added to cart! 🪷🪕`);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const subtotal = jewel.price * quantity;

    return (
        <div className="productful">
            <Header />
            <div className="item-page">
            <div className="image-container">
                        <div className='sub-images-container'>
                            <img src={jewel.images[0]} onClick={() => setMainImage(jewel.images[0])} alt="saree1" />
                            <img src={jewel.images[1]} onClick={() => setMainImage(jewel.images[1])} alt="saree2" />
                            <img src={jewel.images[2]} onClick={() => setMainImage(jewel.images[2])} alt="saree3" />
                        </div>
                        
                        <div className='Main-image' data-role="imagemagnifier" data-magnifier-mode="glass">
                            <img src={mainImage} alt={jewel.name} />
                        </div>
                </div>

                <div className="details-container">
                    <h1 className="Name-of-saree">{jewel.name}</h1>
                    <h3 className="item-price">₹{jewel.price}</h3>
                    <h3 className="item-description">𖢻 {jewel.description} 𖢻</h3>
                    <p className='IDitemid'>Item ID : 1234</p>
                    <p className='SVG'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                    </svg> 
                    Usually Dispatches within 1 to 2 Days
                    <br/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    Enter pincode for delivery date
                    <br/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                    </svg>
                    Easy 7 day return
                    </p>
                    <br/>
                    <h3 className='item-details'>Item-Details:</h3>
                    <table className='Details-table'>
                        <tr className="abc">
                            <td className="def"><p className="item-fabric">Color:</p></td>
                            <td className="def"><p>{jewel.color}</p></td>
                        </tr >
                        <tr className="abc">
                            <td className="def"><p className="item-occasion">Occasion:</p></td>
                            <td className="def"><p>{jewel.occasion}</p></td>
                        </tr>
                        <tr className="abc">
                            <td className="def"><p className="item-origin">Origin:</p></td>
                            <td className="def"><p>{jewel.origin}</p></td>
                        </tr>
                        <tr className="abc">
                            <td className="def"><p className="item-itemtype">Item Type:</p></td>
                            <td className="def"><p>{jewel.itemtype}</p></td>
                        </tr>
                    </table>
                    <br></br>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    {message && <div className="popup-message">{message}</div>}

                    {/* Quantity control */}
                    <div className="quantity-control">
                        <button className="quantity-button" onClick={decrementQuantity}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="quantity-button" onClick={incrementQuantity}>+</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemPage;