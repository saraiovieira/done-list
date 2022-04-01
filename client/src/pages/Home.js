import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../components/Validation.js';


const Home = () => {
    let navigate = useNavigate();
    const apiPort = process.env.REACT_APP_API_PORT
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let validateEmail = (email) => {
        let isEmailValid = {status: true, emailError: ''}
        if (!email) {
            isEmailValid.status = false;
            isEmailValid.emailError = 'Email is required';
        } else if (!validEmail.test(email)) {
            isEmailValid.status = false;
            isEmailValid.emailError = 'Email is invalid';
        }
        return isEmailValid;
    };

    const validatePassword = (password) => {
        let isPasswordValid = {status: true, passwordError: ''}
        if (!password) {
            isPasswordValid.status = false;
            isPasswordValid.passwordError = 'Password is required';
        } else if (!validPassword.test(password)) {
            isPasswordValid.status = false;
            isPasswordValid.passwordError = 'Password is invalid';
        }
        return isPasswordValid;
    };

    const handleLogin = async e => {
        e.preventDefault(); 

        let emailIsValid = validateEmail(email);
        let passwordIsValid = validatePassword(password);

        if(emailIsValid.status && passwordIsValid.status){
            try {
                await axios.post(`http://localhost:${apiPort}/login/`, { 
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("token", res.data.token); 
                    navigate('/donelist');
                });
            } catch (err) {
                console.log(err);
                setErrorMessage('Invalid Credentials');
            }
        } else{
            setEmailError(emailIsValid.emailError);
            setPasswordError(passwordIsValid.passwordError);
        }
    }

    const handleRegister = async e => {
        e.preventDefault();

        let emailIsValid = validateEmail(email);
        let passwordIsValid = validatePassword(password);

        if (emailIsValid.status && passwordIsValid.status) {
            try {
                await axios.post(`http://localhost:${apiPort}/register/`, {
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("token", res.data.token); 
                    navigate('/donelist');
                });
            } catch(err) {
                console.log(err);
                setErrorMessage(`Email: ${email} already exists`);
            } 
        } else{
                setEmailError(emailIsValid.emailError);
                setPasswordError(passwordIsValid.passwordError);
        }           
    }

    return (
        <>
            <p>This is the place where you write down all of the things that you’ve already done</p>
            <p>Every time you log in, you will feel accomplished, grateful, productive and encourage to do more! </p>
            <p>Ready to start accomplishing? </p>
            <input type="text" name="Email" id="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Enter your email" aria-label='email' />
            {emailError && (<p className="error">{emailError}</p>)}
            <input type="password" name="Password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Enter your password" aria-label='password'/>
            {passwordError && (<p className="error">{passwordError}</p>)}
            <button type='button' onClick={handleLogin}>Login</button>
            <button type='button' onClick={handleRegister}>Register</button>
            {errorMessage && (<p className="error">{errorMessage}</p>)}
        </>
    )
}

export default Home
