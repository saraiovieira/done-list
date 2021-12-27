import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();
    return (
        <>
            <h2>Welcome!</h2>
            <button onClick={() => {navigate("/login")}}>Login</button>
            <button onClick={() => {navigate("/register")}} >Register</button>
        </>
    )
}

export default Home
