import React, { useState, useEffect } from 'react';
import './Filter.css';
import ProductCard from './ProductCard';
import ReactSlider from 'react-slider';
import axios from 'axios';

function Filter() {
  const [openSection, setOpenSection] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(60000);
  const [sarees, setSarees] = useState([]); //

  useEffect(() => {
    // Fetch sarees data once
    axios.get('http://localhost:5000/api/inventory')
      .then(response => {
        setSarees(response.data);
      })
      .catch(error => {
        console.error("Error fetching sarees data:", error);
      });
  }, []);

  const toggleContent = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSliderChange = ([min, max]) => {
    setMinValue(min);
    setMaxValue(max);
  };

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
                minDistance={0}
              />
            </div>
          )}

          {/* Fabric Filter */}
          <div className="filter-category" onClick={() => toggleContent('fabric')}>
            <p>Fabric</p>
            <i className="arrow">{openSection === 'fabric' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'fabric' && (
            <div className="filter-content">
              <label><input type="checkbox" /> Cotton</label>
              <label><input type="checkbox" /> Silk</label>
              <label><input type="checkbox" /> Linen</label>
            </div>
          )}

          {/* Colour Filter */}
          <div className="filter-category" onClick={() => toggleContent('colour')}>
            <p>Colour</p>
            <i className="arrow">{openSection === 'colour' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'colour' && (
            <div className="filter-content">
              <label><input type="checkbox" /> Red</label>
              <label><input type="checkbox" /> Blue</label>
              <label><input type="checkbox" /> Green</label>
              <label><input type="checkbox" /> Pink</label>
              <label><input type="checkbox" /> Purple</label>
              <label><input type="checkbox" /> Grey</label>
            </div>
          )}

          {/* Occasion Filter */}
          <div className="filter-category" onClick={() => toggleContent('occasion')}>
            <p>Occasion</p>
            <i className="arrow">{openSection === 'occasion' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'occasion' && (
            <div className="filter-content">
              <label><input type="checkbox" /> Wedding</label>
              <label><input type="checkbox" /> Diwali</label>
              <label><input type="checkbox" /> Casual</label>
            </div>
          )}

          {/* Origin Filter */}
          <div className="filter-category" onClick={() => toggleContent('origin')}>
            <p>Origin</p>
            <i className="arrow">{openSection === 'origin' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'origin' && (
            <div className="filter-content">
              <label><input type="checkbox" /> Rajasthan</label>
              <label><input type="checkbox" /> Contempory</label>
              <label><input type="checkbox" /> Bengal</label>
            </div>
          )}

          {/* Craft Filter */}
          <div className="filter-category" onClick={() => toggleContent('craft')}>
            <p>Craft</p>
            <i className="arrow">{openSection === 'craft' ? '▲' : '▼'}</i>
          </div>
          {openSection === 'craft' && (
            <div className="filter-content">
              <label><input type="checkbox" /> Woven</label>
              <label><input type="checkbox" /> Sanganeri</label>
              <label><input type="checkbox" /> Block Print</label>
            </div>
          )}
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input type="text" />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </div>
        <div className="product-list">
          {sarees.map((saree, index) => (
            <ProductCard key={index} saree={saree} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
