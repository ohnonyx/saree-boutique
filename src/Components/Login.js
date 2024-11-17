import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate();
  const { setUserId, setUserData } = useContext(UserContext); // Access setUserId and setUserData from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const onButtonClick = async () => {
    // Reset error messages and response message
    setEmailError('');
    setPasswordError('');
    setResponseMessage('');
  
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
  
    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }
    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
  
    try {
      // Attempt to log in the user
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        const { userId } = response.data;
        setUserId(userId); // Store userId in context
  
        // Fetch the user data from the backend
        const userDataResponse = await axios.get(`http://localhost:5000/api/user?userId=${userId}`);
        setUserData(userDataResponse.data); // Store user data in context
  
        setResponseMessage(`Logged in as: ${email}`);
        navigate('/user'); // Redirect to the user page
      } else {
        setResponseMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Invalid email or password.');
    }
  
    setEmail('');
    setPassword('');
  };
  

  return (
    <UserContext.Provider value={{ setUserId, setUserData }}>
      <div>
        <Header />
        <div className="mainContainer">
          <div className="form-container">
            <div className="titleContainer">
              <div>LOGIN</div>
            </div>
            <form id="dataForm" onSubmit={(e) => e.preventDefault()}>
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
    </UserContext.Provider>
  );
};

export default Login;
