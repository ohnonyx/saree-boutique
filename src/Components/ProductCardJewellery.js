import React from 'react';
import './ProductCard.css';

const ProductCardjewel = ({ jewel, onClick  }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={jewel.images[0]} alt={`${jewel.color} jewellery`} />
      <p>{jewel.name}</p>
      <p>₹{jewel.price}</p>
    </div>
  );
};

export default ProductCardjewel;