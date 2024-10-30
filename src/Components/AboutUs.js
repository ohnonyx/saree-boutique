import React from 'react';
import Header from '../Components/Header';
import './AboutUs.css'; 
import logo from '../logo.png'
import saree from './saree.png';
import Footer from '../Components/Footer';


function About() {
    return(
        <div className='AboutUs'>
            <Header/>
            <h1>About Us</h1>
            <img id="saree" src={saree}/><p id='para'>Welcome to our enchanting realm of sarees and jewelry, where the essence of timeless elegance meets the artistry of tradition. Each saree in our collection is a masterpiece, lovingly crafted to reflect the rich tapestry of Indian heritage, while our exquisite jewelry pieces are designed to illuminate your unique beauty. We believe in the power of craftsmanship, empowering skilled artisans to bring their visions to life. Here, every thread and gem tells a story, inviting you to indulge in the luxurious experience of adornment. Join us in celebrating grace and sophistication, as we curate pieces that transform every moment into a cherished memory. Embrace the elegance within you and let our creations be a part of your journey.</p>
            <Footer/>
        </div>
    );
}


export default About;