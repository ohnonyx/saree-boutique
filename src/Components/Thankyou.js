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

//     return (
//         <div>
//             <Header/>
//             <div>
//         <div className="mainc">

            
            
//             <div id="app">
//                 <div className="title">
//                     <div className="title-inner">
//                         <div className="cafe">
//                             <div className="cafe-inner">Thank</div>
//                         </div>
//                         <div className="mozart">
//                             <div className="mozart-inner">You</div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="image">
//                     <img src={saree} alt="Saree" />
//                 </div>

                
//             </div>
            
//         </div>
//         </div>
//         <Footer/>
//         </div>
//     );
// };

// export default Thankyou;




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