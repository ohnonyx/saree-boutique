import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import ProductCard from './ProductCard';
import axios from 'axios';

function Categories() {
  const navigate = useNavigate();
  const [sarees, setSarees] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/inventory')
      .then(response => {
        setSarees(response.data);
      })
      .catch(error => {
        console.error("Error fetching sarees data:", error);
      });
  }, []);
  return (
    <div className="categories">
      <h1>CATEGORIES</h1>
      <div className="category-items">
        <div className="category" onClick={() => navigate('/search')}>
          <img src="https://priyangaa.in/cdn/shop/files/jpeg-optimizer_200a.jpg?v=1719228980" alt="Sarees" />
          <div className="category-text">Sarees</div>
        </div>
        <div className="category" onClick={() => navigate('/search')}>
          <img src="https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2021/11/337781593_1.jpg" alt="Jewellery" />
          <div className="category-text">Jewellery</div>
        </div>
      </div>
      <br/>
      <h1>HOT SELLING</h1>
      <div className='hot-selling'>
        {sarees.slice(0,3).map((saree, index) => (
              <ProductCard key={index} saree={saree} />
            ))}
      </div>
    </div>
  );
}

export default Categories;
