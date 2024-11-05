import React, { useState } from 'react';
import './Signin.css';

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const onButtonClick = () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setAddressError('');
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

        if ('' === address) {
            setAddressError('Please enter an address');
            return;
        }

        // Simulate a successful login
        setResponseMessage(`Signed in as: ${email}`);
        
        // Reset the form fields
        setEmail('');
        setPassword('');
        setAddress('');
    }

    const ongoogleButtonClick = () => {
        
    setResponseMessage(`Signed in through google as: ${email}`);
    }

    return (
        <div className={'mainContainer'}>
        <div className="form-container">
            <div className={'titleContainer'}>
                <div>SIGN UP</div>
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

                Address:
                <div className={'inputContainer'}>
                    <textarea
                        value={address}
                        placeholder="Enter your address here"
                        onChange={(ev) => setAddress(ev.target.value)}
                        className={'addressBox'}>
                        </textarea>
                    <label className="errorLabel">{addressError}</label>

                </div>
                <br/>

                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
                </div>
                <br />
                <div className={'googlecontainer'}>
                    <input className={'googleButton'} type="button" onClick={ongoogleButtonClick} value={'Sign Up with Google'} />
                </div>
                {responseMessage && <div className="responseMessage">{responseMessage}</div>}
            </form>
        </div>
        </div>
    );
}

export default Signin;
