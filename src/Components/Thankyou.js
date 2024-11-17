import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from './Header';
import Footer from './Footer';
import './Thankyou.css';  
import saree from './saree1.jpg';  

const Thankyou = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Handle the Go back Home button click
    const onButtonClick = () => {
        navigate('/HomePage'); // Navigate to HomePage
    };

return (
    <div className="thankyou-container">
      <Header/>
      
      <main className="breathe-animation">
        <span>Thank You</span>
      </main>

      <Footer/>
    </div>
  );
};

export default Thankyou;