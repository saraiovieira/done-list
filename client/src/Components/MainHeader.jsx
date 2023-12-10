import React from "react";
import logo from "../../src/logo.svg";

const MainHeader = () => {
  return (
    <header className="main-header">
      <img className="main-header__logo" src={logo} alt="Done List Logo" />
      <h1 className="main-header__title">Done List</h1>
    </header>
  );
};

export default MainHeader;