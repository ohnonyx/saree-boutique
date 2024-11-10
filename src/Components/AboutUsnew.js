import React from 'react';
import Header from '../Components/Header';
import './AboutUsnew.css'; 
import logo from '../logo.png'
import aboutuspic from './aboutuspic.jpg';
import Footer from '../Components/Footer';
import Nishita from './nishita.jpg';
import nithyaA from './nithyaA.jpeg';
import NithyaP from './NithyaP.jpg';

function Aboutusnew() {
    return(
        <div className='Aboutpage'>
            <Header/>
            <div className='AboutUs'>
                <table className='Table'>
                    <tr width='100%'>
                        <td className='column1' width='40%' >
                            <img className="picture animatable" src={aboutuspic}></img>
                        </td>

                        <td className='column2' width='60%'>
                        <h1 className='heading animatable'>About Us</h1>
                        <div className='Para animatable'>Welcome to our enchanting realm of sarees and jewelry, where the essence of timeless elegance meets the artistry of tradition. Each saree in our collection is a masterpiece, 
                            lovingly crafted to reflect the rich tapestry of Indian heritage, while our exquisite jewelry pieces are designed to illuminate your unique beauty. 
                            We believe in the power of craftsmanship, empowering skilled artisans to bring their visions to life. 
                            Here, every thread and gem tells a story, inviting you to indulge in the luxurious experience of adornment. 
                            Join us in celebrating grace and sophistication, as we curate pieces that transform every moment into a cherished memory. Embrace the elegance within you and let our creations be a part of your journey.</div>
                        </td>
                    </tr>
                </table>
                <br></br>
                <div className='AboutTeam'>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <h1 className='OurTeam animatable'>Our Team</h1>
                    <div class="row">
                    <div class="column">
                        <div class="card animatable">
                        <img className="teampic" src={Nishita} alt="Nishita"/>
                        <div class="container">
                            <h2>Nishita Singh</h2>
                            <p class="title">Home Page and Search with filter Page </p>
                            <p>She is Topper. Part Of embrione, willing to not learn new things. Gaming addict</p>
                            <p>find.nishita@gmail.com</p>
                            <p><a href='https://in.linkedin.com/in/nishita-singh-267a1a214'><button class="button">Linked In</button></a></p>
                        </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card animatable">
                        <img className="teampic" src={nithyaA} alt="Nithya A" />
                        <div class="container">
                            <h2>Nithya Anantharaman</h2>
                            <p class="title">Cart and Login Page</p>
                            <p>Again also Topper. Singer and fantasy reader supreme :)</p>
                            <p>nithyaananth09@gmail.com</p>
                            <p><a href='https://in.linkedin.com/in/nithya-anantharaman-0b2538304'><button class="button">Linked In</button></a></p>
                        </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card animatable">
                        <img className="teampic" src={NithyaP} alt="Nithya P"/>
                        <div class="container">
                            <h2>Nithya Prashaanthi. R</h2>
                            <p class="title">About Us and Item Page</p>
                            <p>Cute. Young. Dumb. Stupid. could do with some sleep. live life to the fullest :P</p>
                            <p>nithyaprashaanthi@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
} 


export default Aboutusnew;