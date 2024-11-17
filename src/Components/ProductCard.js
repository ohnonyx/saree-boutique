// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ saree, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={saree.images[0]} alt={`${saree.color} saree`} />
      <p>{saree.name}</p>
      <p>₹{saree.price}</p>
    </div>
  );
};

export default ProductCard;
