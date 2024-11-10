// import React,  { useState } from 'react';
// import Header from '../Header';
// import './ItemPagenew.css';
// import Footer from '../Footer';
// import saree1 from './saree1.jpg';
// import saree2 from './saree2.jpg';
// import saree3 from './saree3.jpg';
// import saree4 from './saree4.jpg';


// const ProductDisplay = () => {
//         const [quantity, setQuantity] = useState(1);
//         const [message, setMessage] = useState('');
//         const [mainImage, setMainImage] = useState(saree1);
//         const [items, setItems] = useState([
//             { id: 1, name: 'saree name', price: 5000000, quantity: 1, imageUrl: 'saree1.jpg' },
//           ]);
    
//         const saree = {
//             name: "Traditional Silk Saree",
//             price: "₹4,500",
//             description: "A beautiful traditional silk saree, perfect for weddings and festive occasions.",
//         };
    
//         const incrementQuantity = (id) => {
//             setItems(items.map(item => 
//                 item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//             ));
//           };
        
//           // Function to decrease quantity with confirmation prompt
//         const decrementQuantity = (id) => {
//             setItems(items.map(item => {
//                 if (item.id === id) {
//                     if (item.quantity === 0) {
//                         const confirmDelete = window.confirm(`Are you sure you want to remove ${item.name} from the cart?`);
//                     if (confirmDelete) {
//                         return null; // Mark for deletion
//                     } else {
//                         return item; // Keep the item unchanged
//                     }
//                 }
//                 return { ...item, quantity: item.quantity - 1 };
//             }
//             return item;
//             }).filter(item => item !== null)); // Remove items marked for deletion
//           };
    
//         const handleAddToCart = () => {
//             setMessage(`🌟 ${quantity} ${saree.name} added to cart! 🌟`);
//             setTimeout(() => {
//                 setMessage('');
//             }, 3000);
//         }  
//   return (
//     <div className='Itempage'>
//         <Header/>  
//         <div className="product-container">
//             {/* Left side: Thumbnails */}
//             <div className="thumbnail-container">
//                 {/* Add thumbnails here as images */}
//                     <img src={saree1} onClick={() => setMainImage(saree1)} alt="saree1" />
//                     <img src={saree2} onClick={() => setMainImage(saree2)} alt="saree2" />
//                     <img src={saree3} onClick={() => setMainImage(saree3)} alt="saree3" />
//                     <img src={saree4} onClick={() => setMainImage(saree4)} alt="saree4" />
//                 {/* Add more thumbnails as needed */}
//             </div>

//             {/* Main product image */}
//             <div className='Main-image'>
//                     <img src={mainImage} alt={saree.name} />
//             </div>

//             {/* Right side: Product details */}
//             <div className="product-details">
//                 <h1>FLEXIMAA Women's Cotton Full Zipper Sweatshirt Hoodie</h1>
//                 <div className="rating">
//                 <span>3.9 ★</span> | 14,556 ratings | 100+ bought in past month
//                 </div>
//                 <div className="price-section">
//                 <span className="discount">-57%</span>
//                 <span className="price">₹649</span>
//                 <span className="mrp">M.R.P.: ₹1,499</span>
//                 </div>
//                 <p>Inclusive of all taxes</p>
//                 <p>EMI starts at ₹225 per month. <a href="#">EMI options</a></p>

//                 {/* Offers */}
//                 <div className="offers">
//                 <div className="offer-box">Bank Offer: Upto ₹100.00 discount on select...</div>
//                 <div className="offer-box">Partner Offer: Get GST invoice and save up to 28%...</div>
//                 </div>

//                 {/* Size and Color options */}
//                 <div className="options">
//                 <label>Size:</label>
//                 <select>
//                     <option>M</option>
//                     <option>S</option>
//                     <option>L</option>
//                 </select>
                
//                 <label>Colour:</label>
//                 <div className="color-options">
//                     <div className="color-box maroon active"></div>
//                     <div className="color-box yellow"></div>
//                     {/* Add more color options */}
//                 </div>
//                 </div>
//             </div>
//         </div>
//         <Footer/>
//     </div>
//   );
// };

// export default ProductDisplay;