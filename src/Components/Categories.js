import React from 'react';
import './Categories.css';

function Categories() {
  return (
    <div className="categories">
      <h2>CATEGORIES</h2>
      <div className="category-items">
        <div className="category">
          <img src="https://priyangaa.in/cdn/shop/files/jpeg-optimizer_200a.jpg?v=1719228980" alt="Sarees" />
          <div className="category-text">Sarees</div>
        </div>
        <div className="category">
          <img src="https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2021/11/337781593_1.jpg" alt="Jewellery" />
          <div className="category-text">Jewellery</div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
