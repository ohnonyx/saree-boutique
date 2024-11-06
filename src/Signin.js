import React, { useState } from 'react';
import './Signin.css';

const Signin = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const onButtonClick = () => {
        // Reset error messages
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setNumberError('');
        setAddressError('');
        setResponseMessage('');

        if ('' === name) {
            setNameError('Please enter your full name');
            return;
        }

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

        if ('' === number) {
            setNumberError('Please enter a phone number');
            return;
        }
        if (number.length < 10 || number.length>10) {
            setNumberError('The password must be 10 characters');
            return;
        }

        if (!/^[6-9]\d{9}$/.test(number)) {
            setNumberError('Please enter a valid phone number');
            return;
        }
        

        if ('' === address) {
            setAddressError('Please enter an address');
            return;
        }

        // Simulate a successful login
        setResponseMessage(`Signed in as: ${email}`);
        
        // Reset the form fields
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setNumber('');
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

                Full name:
                <div className={'inputContainer'}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your full name here"
                        onChange={(ev) => setName(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{nameError}</label>
                </div>
                <br/>

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

                Phone number:
                <div className={'inputContainer'}>
                    <input
                        type= 'tel'
                        value={number}
                        placeholder="Enter your phone number here"
                        onChange={(ev) => setNumber(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{numberError}</label>
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
