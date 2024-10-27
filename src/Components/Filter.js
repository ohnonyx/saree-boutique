import React from 'react';
import './Filter.css';
import ProductCard from './ProductCard';


function Filter() {
  return (
    <div className="filter-page">
      <div className="filter-section">
        <h2>FILTER</h2>
        <p>Sort:</p>
        <div className="filter-options">
          <label>
            <input type="checkbox" />
            By popularity
          </label>
          <label>
            <input type="checkbox" />
            By price
          </label>
          <div className="price-options">
            <label>
              <input type="radio" name="price" />
              Low to high
            </label>
            <label>
              <input type="radio" name="price" />
              High to low
            </label>
          </div>
          <label>
            <input type="checkbox" />
            By colour
          </label>
          <label>
            <input type="checkbox" />
            By material
          </label>
        </div>
      </div>
      <div className="search-section">
        <div className="search-bar">
          <input type="text" />
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          </button>
        </div>
        <div className="product-list">
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
    </div>
  );
}

export default Filter;
