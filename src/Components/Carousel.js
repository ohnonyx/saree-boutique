import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  'https://www.kollybollyethnics.com/image/catalog/data/10May2018/Bollywood-Sabyasachi-Inspired-turquoise-organza-saree-s205.jpg',
  'https://www.soch.com/media/wysiwyg/Ivory_Elegence_Main-Strip-Banner_Desktop-min.jpg?auto=webp&format=pjpg&quality=85',
  'https://www.soch.com/media/wysiwyg/HB_Desktop-min_3.jpg',
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // 3 seconds interval

    // Clean up the interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="carousel-controls">
        <svg
          onClick={() =>
            setCurrentSlide((currentSlide - 1 + images.length) % images.length)
          }
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="white"
          className="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
        <svg
          onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="white"
          className="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </div>
    </div>
  );
}

export default Carousel;
