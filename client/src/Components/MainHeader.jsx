import React from "react";
import logo from "../../src/logo.svg";

const MainHeader = () => {
  return (
    <>
      <header className="main__header">
        <img className="home_logo" src={logo} alt="Done List Logo" />
        <h1> Done List </h1>
      </header>
    </>
  );
};

export default MainHeader;
