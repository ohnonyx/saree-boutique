import React, { useState, useEffect } from 'react';
import './Filter.css';
import ReactSlider from 'react-slider';
import axios from 'axios';
import PlaceholderCard from './Placeholder';
import ProductCardjewel from './ProductCardJewellery';
import { useNavigate } from 'react-router-dom';

function JewelleryFilter() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(500000);
  const [jewel, setJewel] = useState([]);
  const [filteredJewel, setFilteredJewel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter states
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Jewellry')
      .then(response => {
        setJewel(response.data);
        setFilteredJewel(response.data);
      })
      .catch(error => {
        console.error("Error fetching Jewellery data:", error);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [minValue, maxValue, selectedColours, selectedOccasions, selectedOrigins, selectedItemType]);

  const applyFilters = () => {
    const filtered = jewel.filter(jewel => {
      const meetsPrice = jewel.price >= minValue && jewel.price <= maxValue;
      const meetsColour = selectedColours.length === 0 || selectedColours.includes(jewel.color);
      const meetsOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(jewel.occasion);
      const meetsOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(jewel.origin);
      const meetsItemType = selectedItemType.length === 0 || selectedItemType.includes(jewel.itemtype);

      return meetsPrice && meetsColour && meetsOccasion && meetsOrigin && meetsItemType;
    });

    setFilteredJewel(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(60000);
    setSelectedColours([]);
    setSelectedOccasions([]);
    setSelectedOrigins([]);
    setSelectedItemType([]);
    setFilteredJewel(jewel);
    setCurrentPage(1);
  };

  const toggleContent = (section) => {
    setOpenSection(prev => 
      prev.includes(section) ? prev.filter(item => item !== section) : [...prev, section]
    );
  };

  const handleSliderChange = ([min, max]) => {
    setMinValue(min);
    setMaxValue(max);
  };

  const handleCheckboxChange = (setFilterState, value) => {
    setFilterState(prevState =>
      prevState.includes(value) ? prevState.filter(item => item !== value) : [...prevState, value]
    );
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentJewel = filteredJewel.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJewel.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const placeholdersNeeded = itemsPerPage - currentJewel.length;

  return (
    <div className="filter-page">
      <div className="filter-section">
        <h2>Filter By</h2>        
        <div className="filter-options">
          {/* Price Filter */}
          <div className="price-slider filter-category" onClick={() => toggleContent('price')}>
            <p>Price</p>
            <i className="arrow">{openSection.includes('price') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('price') && (
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

          {/* Colour Filter */}
          <div className="filter-category" onClick={() => toggleContent('colour')}>
            <p>Colour</p>
            <i className="arrow">{openSection.includes('colour') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('colour') && (
            <div className="filter-content">
              {['Gold', 'Silver', 'Oxidised', 'Platinum', 'Diamond', 'Rose Gold'].map(color => (
                <label key={color}>
                  <input type="checkbox" 
                         checked={selectedColours.includes(color)}
                         onChange={() => handleCheckboxChange(setSelectedColours, color)} />
                  {color}
                </label>
              ))}
            </div>
          )}

          {/* Occasion Filter */}
          <div className="filter-category" onClick={() => toggleContent('occasion')}>
            <p>Occasion</p>
            <i className="arrow">{openSection.includes('occasion') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('occasion') && (
            <div className="filter-content">
              {['Wedding', 'Special Occasions', 'Casual'].map(occasion => (
                <label key={occasion}>
                  <input type="checkbox" 
                         checked={selectedOccasions.includes(occasion)}
                         onChange={() => handleCheckboxChange(setSelectedOccasions, occasion)} />
                  {occasion}
                </label>
              ))}
            </div>
          )}

          {/* Origin Filter */}
          <div className="filter-category" onClick={() => toggleContent('origin')}>
            <p>Manufacturer</p>
            <i className="arrow">{openSection.includes('origin') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('origin') && (
            <div className="filter-content">
              {['Pride', 'Ratna', 'Apurva'].map(origin => (
                <label key={origin}>
                  <input type="checkbox" 
                         checked={selectedOrigins.includes(origin)}
                         onChange={() => handleCheckboxChange(setSelectedOrigins, origin)} />
                  {origin}
                </label>
              ))}
            </div>
          )}

          {/* Craft Filter */}
          <div className="filter-category" onClick={() => toggleContent('itemtype')}>
            <p>Craft</p>
            <i className="arrow">{openSection.includes('itemtype') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('itemtype') && (
            <div className="filter-content">
              {['Necklace', 'Pendant', 'Earrings', 'Bracelet', 'Ring', 'Whole Sets'].map(itemtype => (
                <label key={itemtype}>
                  <input type="checkbox" 
                         checked={selectedItemType.includes(itemtype)}
                         onChange={() => handleCheckboxChange(setSelectedItemType, itemtype)} />
                  {itemtype}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="reset-button-container">
          <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      <div className="search-section">
        <div className="product-list">
          {currentJewel.map((jewel, index) => (
            <ProductCardjewel onClick={() => navigate(`/jewel/${jewel.id}`, { state: { jewel }})}  key={index} jewel={jewel} />
          ))}
          {placeholdersNeeded > 0 && Array(placeholdersNeeded).fill(<PlaceholderCard />)}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredJewel.length / itemsPerPage)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default JewelleryFilter;