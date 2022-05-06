import React from "react";
import Logo from "../../src/logo.svg";

const Header = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header>
      <img className="logo" src={Logo} alt="Done list logo" />
      <h1> Your Done List </h1>
      <button type="button" onClick={logOut}>
        Log out
      </button>
    </header>
  );
};

export default Header;