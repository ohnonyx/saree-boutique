import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const navigate = useNavigate();
  return (
    <div className="categories">
      <h2>CATEGORIES</h2>
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
    </div>
  );
}

export default Categories;
