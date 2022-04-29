import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  let isLogged = token == null ? false : true;
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
