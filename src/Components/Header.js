import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 
import logo from '../logo.png'

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="logo"/>
      </div>
      <div className="search-bar element">
        <input type="text" placeholder="Search" />
        <button type="submit"><i className="fa fa-search"></i></button>
      </div>
      <div className="category-buttons">
      <button className="category-btn" onClick={() => navigate('/')}>Home</button>
        <button className="category-btn" onClick={() => navigate('/search')}>Sarees</button>
        <button className="category-btn">Jewellery</button>
        <button className="category-btn" onClick = {() => navigate('/aboutus')}>About Us</button>
      </div>
      <div className="cart" onClick={() => navigate('/cart')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
        </svg>
      </div>
      <div className="user-login">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
      </div>
      
    </header>
  );
}

export default Header;
