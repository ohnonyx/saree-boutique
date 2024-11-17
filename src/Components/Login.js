import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';
import Header from './Header';
import Footer from './Footer';
import { CartContext } from '../App';

const Login = () => {
    const navigate = useNavigate();
    const { setAddToCart } = useContext(CartContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const onButtonClick = async () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setResponseMessage('');

        // Validate email
        if (email.trim() === '') {
            setEmailError('Please enter your email');
            return;
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        // Validate password
        if (password.trim() === '') {
            setPasswordError('Please enter a password');
            return;
        }
        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        try {
            // Make a POST request to the backend
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            if (response.data.success) {
                setResponseMessage(`Logged in as: ${email}`);
                setAddToCart(1);
                navigate('/user'); // Redirect to the user page
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setResponseMessage('User does not exist. Please sign up.');
                navigate('/signup'); // Redirect to the signup page
            } else {
                setResponseMessage('Invalid email or password.');
            }
        }

        // Reset the form fields
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="form-container">
                    <div className="titleContainer">
                        <div>LOGIN</div>
                    </div>
                    <form id="dataForm">
                        <br />
                        <div className="inputContainer">
                            E-mail:
                            <input
                                type="text"
                                value={email}
                                placeholder="Enter your email here"
                                onChange={(ev) => setEmail(ev.target.value)}
                                className="inputBox"
                            />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <br />
                        Password:
                        <div className="inputContainer">
                            <input
                                type="password"
                                value={password}
                                placeholder="Enter your password here"
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="inputBox"
                            />
                            <label className="errorLabel">{passwordError}</label>
                        </div>

                        <br />
                        <div className="inputContainer">
                            <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
                        </div>
                        <br />
                        <div className="signupContainer">
                            Don't have an account?{' '}
                            <input className="signupButton" type="button" onClick={() => navigate('/signin')} value="Sign Up" />
                        </div>
                        {responseMessage && <div className="responseMessage">{responseMessage}</div>}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
