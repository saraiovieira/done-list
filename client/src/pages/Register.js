import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async e => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Email and password are required');
        } else {
            try {
                await axios.post("http://localhost:5000/register/", {
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("token", res.data.token); 
                    navigate('/todolist');
                });
            } catch(err) {
                console.log(err);
                setErrorMessage('User already exists');
            }
        }
                
    }
    return (
        <div>
            <h2>Register</h2>
            <input type="text" name="Email" id="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Enter your email" aria-label='register' />
            <input type="password" name="Password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Enter your password" aria-label='register'/>
            <button type='button' onClick={handleRegister}>Register</button>
            {errorMessage && (
            <p className="error"> {errorMessage} </p>)}
        </div>
    )
}

export default Register
