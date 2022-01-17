import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';


const PrivateRoute = () => {
    const result = document.cookie;
    let isLogged = true;

    if (result) {
        isLogged = true
    }else {
    isLogged = false
    }
  
    return isLogged ? <Outlet/> : <Navigate to="/" />;
}

export default PrivateRoute