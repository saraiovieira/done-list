import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Email and Password are required');
        } else {
            try {
                await axios.post("http://localhost:5000/login/", {
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
        }
       
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" name="Email" id="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Enter your email" aria-label='login' />
            <input type="password" name="Password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Enter your password" aria-label='login'/>
            <button type='button' onClick={handleLogin}>Login</button>
            {errorMessage && (
            <p className="error"> {errorMessage} </p>)}
        </div>
    )
}

export default Login
