import React from 'react'

const Register = () => {
    return (
        <div>
            <h2>Register</h2>
            <input type="text" name="Email" id="email" placeholder="Enter your email" aria-label='login' />
            <input type="password" name="Password" id="password" placeholder="Enter your password" aria-label='login'/>
            <button type='button'>Register</button>
        </div>
    )
}

export default Register
