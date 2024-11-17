// import React, { useState, useEffect } from 'react';
// import './Carousel.css';

// const images = [
//   'https://images-eu.ssl-images-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/Saree/Blouses/Blouse_Corner_Header1.png',
//   'https://www.soch.com/media/wysiwyg/Ivory_Elegence_Main-Strip-Banner_Desktop-min.jpg?auto=webp&format=pjpg&quality=85',
//   'https://www.soch.com/media/wysiwyg/HB_Desktop-min_3.jpg',
// ];

// function Carousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Change slide every 3 seconds
//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 3000); // 3 seconds interval

//     // Clean up the interval on component unmount
//     return () => clearInterval(slideInterval);
//   }, []);

//   return (
//     <div className="carousel">
//       <div
//         className="carousel-slides"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="slide"
//             style={{ backgroundImage: `url(${image})` }}
//           />
//         ))}
//       </div>
//       <div className="carousel-controls">
//         <svg
//           onClick={() =>
//             setCurrentSlide((currentSlide - 1 + images.length) % images.length)
//           }
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           fill="white"
//           className="bi bi-caret-left-fill"
//           viewBox="0 0 16 16"
//         >
//           <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
//         </svg>
//         <svg
//           onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           fill="white"
//           className="bi bi-caret-right-fill"
//           viewBox="0 0 16 16"
//         >
//           <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default Carousel;
import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const images = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/Saree/Blouses/Blouse_Corner_Header1.png',
  'https://c1.wallpaperflare.com/preview/18/692/20/gold-decoration-jewellery-luxury-party-golden.jpg',
  'https://www.soch.com/media/wysiwyg/HB_banner_Desktop-min_4.jpg',
  'https://www.koskii.com/cdn/shop/files/Website-Banner_4_1944x.jpg?v=1727201858'
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at the "first" slide (duplicated)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slidesRef = useRef(null);

  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentSlide((prev) => prev - 1);
  };

  // Handle "infinite" transition effect
  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);

      if (currentSlide === totalSlides + 1) {
        setCurrentSlide(1); // Jump back to the first slide (no animation)
      } else if (currentSlide === 0) {
        setCurrentSlide(totalSlides); // Jump back to the last slide (no animation)
      }
    }, 600); // Match CSS transition duration

    return () => clearTimeout(timeout);
  }, [currentSlide, isTransitioning]);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none',
        }}
        ref={slidesRef}
      >
        {/* Duplicate the last slide before the first */}
        <div
          className="slide"
          style={{
            backgroundImage: `url(${images[totalSlides - 1]})`,
          }}
        />
        {/* Render all slides */}
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Duplicate the first slide after the last */}
        <div
          className="slide"
          style={{
            backgroundImage: `url(${images[0]})`,
          }}
        />
      </div>
      <div className="carousel-controls">
        <svg
          onClick={handlePrevSlide}
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
          onClick={handleNextSlide}
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
