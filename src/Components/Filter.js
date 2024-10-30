import React, { useState } from 'react';
import './Filter.css';
import ProductCard from './ProductCard';
import ReactSlider from 'react-slider';


function Filter() {
  const [openSection, setOpenSection] = useState(null);

  const toggleContent = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(50000);

  const handleSliderChange = ([min, max]) => {
    setMinValue(min);
    setMaxValue(max);
  };
  // const handleMinPriceChange = (e) => {
  //   const value = Math.min(Number(e.target.value), maxPrice - 1); // Ensure min < max
  //   setMinPrice(value);
  // };

  // const handleMaxPriceChange = (e) => {
  //   const value = Math.max(Number(e.target.value), minPrice + 1); // Ensure max > min
  //   setMaxPrice(value);
  // };

  // const handleSliderChange = (e) => {
  //   const value = Number(e.target.value);
  //   if (value < maxPrice) setMinPrice(value);
  //   else setMaxPrice(value);
  
  return (
    <div className="filter-page">
      <div className="filter-section">
        <h2>Filter By</h2>        
        <div className="filter-options">
        <div className="price-slider filter-category" onClick={() => toggleContent('price')}>
          <p>Price</p>
          <i className="arrow">{openSection === 'price' ? '▲' : '▼'}</i>
        </div>
        {openSection === 'price' && (
          <div className="filter-content">
            <input type="number" value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} className="price-input" />
            <input type="number" value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} className="price-input" />
            <ReactSlider
              className="slider"
              thumbClassName="thumb"
              trackClassName="track"
              min={1}
              max={60000}
              value={[minValue, maxValue]}
              onChange={handleSliderChange}
              pearling
              minDistance={1000}  
            />
          </div>)}
        <div className="filter-category" onClick={() => toggleContent('fabric')}>
          <p>Fabric</p>
          <i className="arrow">{openSection === 'fabric' ? '▲' : '▼'}</i>
        </div>
        {openSection === 'fabric' && <div className="filter-content">Content for Fabric</div>}

        <div className="filter-category" onClick={() => toggleContent('colour')}>
          <p>Colour</p>
          <i className="arrow">{openSection === 'colour' ? '▲' : '▼'}</i>
        </div>
        {openSection === 'colour' && <div className="filter-content">Content for Colour</div>}

          
          <div className="filter-category" onClick={() => toggleContent('occasion')}>
            <p>Occasion</p>
            <i className="arrow">{openSection === 'occasion' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'occasion' && <div className="filter-content">Content for Occasion</div>}
          <div className="filter-category" onClick={() => toggleContent('origin')}>
            <p>Origin</p>
            <i className="arrow">&#9660;</i>
          </div>
          {openSection === 'origin' && <div className="filter-content">Content for Origin</div>}
          
          
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
