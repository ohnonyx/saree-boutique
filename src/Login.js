import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const onButtonClick = () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setResponseMessage('');

        // Validate email
        if ('' === email) {
            setEmailError('Please enter your email');
            return;
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        // Validate password
        if ('' === password) {
            setPasswordError('Please enter a password');
            return;
        }
        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        // Simulate a successful login
        setResponseMessage(`Logged in as: ${email}`);
        
        // Reset the form fields
        setEmail('');
        setPassword('');
    }

    

    return (
        <div className={'mainContainer'}>
        <div className="form-container">
            <div className={'titleContainer'}>
                <div>LOGIN</div>
            </div>
            <form id="dataForm">
                <br />

                <div className={'inputContainer'}>
                    E-mail:
                    <input
                        type="text"
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={'inputBox'} 
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                Password:
                <div className={'inputContainer'}>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>

                <br/>
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
                </div>
                
                <br/>
                <div className={'signupContainer'}>
                    Don't have an account?   
                    <input className={'signupButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
                </div>

                {responseMessage && <div className="responseMessage">{responseMessage}</div>}
            </form>
        </div>
        </div>
    );
}


export default Login;
