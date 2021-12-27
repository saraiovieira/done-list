import React from 'react'

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <input type="text" name="Email" id="email" placeholder="Enter your email" aria-label='login' />
            <input type="password" name="Password" id="password" placeholder="Enter your password" aria-label='login'/>
            <button type='button'>Login</button>
        </div>
    )
}

export default Login
