import React, { useState, useEffect } from 'react';
import './Filter.css';
import ProductCard from './ProductCard';
import ReactSlider from 'react-slider';
import axios from 'axios';
import PlaceholderCard from './Placeholder';
import { useNavigate } from 'react-router-dom';

function Filter() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(15000);
  const [sarees, setSarees] = useState([]);
  const [filteredSarees, setFilteredSarees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter states
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedCrafts, setSelectedCrafts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/inventory')
      .then(response => {
        setSarees(response.data);
        setFilteredSarees(response.data);
      })
      .catch(error => {
        console.error("Error fetching sarees data:", error);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [minValue, maxValue, selectedFabrics, selectedColours, selectedOccasions, selectedOrigins, selectedCrafts]);

  const applyFilters = () => {
    const filtered = sarees.filter(saree => {
      const meetsPrice = saree.price >= minValue && saree.price <= maxValue;
      const meetsFabric = selectedFabrics.length === 0 || selectedFabrics.includes(saree.fabric);
      const meetsColour = selectedColours.length === 0 || selectedColours.includes(saree.color);
      const meetsOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(saree.occasion);
      const meetsOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(saree.origin);
      const meetsCraft = selectedCrafts.length === 0 || selectedCrafts.includes(saree.craft);

      return meetsPrice && meetsFabric && meetsColour && meetsOccasion && meetsOrigin && meetsCraft;
    });

    setFilteredSarees(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(15000);
    setSelectedFabrics([]);
    setSelectedColours([]);
    setSelectedOccasions([]);
    setSelectedOrigins([]);
    setSelectedCrafts([]);
    setFilteredSarees(sarees);
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
  const currentSarees = filteredSarees.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredSarees.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const placeholdersNeeded = itemsPerPage - currentSarees.length;

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
                max={15000}
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
            <i className="arrow">{openSection.includes('fabric') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('fabric') && (
            <div className="filter-content">
              {['Cotton', 'Silk', 'Organza', 'Viscose'].map(fabric => (
                <label key={fabric}>
                  <input type="checkbox" 
                         checked={selectedFabrics.includes(fabric)}
                         onChange={() => handleCheckboxChange(setSelectedFabrics, fabric)} />
                  {fabric}
                </label>
              ))}
            </div>
          )}

          {/* Colour Filter */}
          <div className="filter-category" onClick={() => toggleContent('colour')}>
            <p>Colour</p>
            <i className="arrow">{openSection.includes('colour') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('colour') && (
            <div className="filter-content">
              {['Red', 'Brown', 'Black', 'Pink', 'Purple', 'Multicolor'].map(color => (
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
              {['Party', 'Diwali', 'Casual', 'Festive'].map(occasion => (
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
            <p>Origin</p>
            <i className="arrow">{openSection.includes('origin') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('origin') && (
            <div className="filter-content">
              {['Rajasthan', 'Contemporary', 'Bhagalpur', 'Maheshwar'].map(origin => (
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
          <div className="filter-category" onClick={() => toggleContent('craft')}>
            <p>Craft</p>
            <i className="arrow">{openSection.includes('craft') ? '▲' : '▼'}</i>
          </div>
          {openSection.includes('craft') && (
            <div className="filter-content">
              {['Woven', 'Sanganeri', 'Hand Painted', 'Embriodered'].map(craft => (
                <label key={craft}>
                  <input type="checkbox" 
                         checked={selectedCrafts.includes(craft)}
                         onChange={() => handleCheckboxChange(setSelectedCrafts, craft)} />
                  {craft}
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
          {currentSarees.map((saree, index) => (
            <ProductCard onClick={() => navigate(`/saree/${saree.id}`, { state: { saree }})}  key={index} saree={saree} />
          ))}
          {placeholdersNeeded > 0 && Array(placeholdersNeeded).fill(<PlaceholderCard />)}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredSarees.length / itemsPerPage)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;