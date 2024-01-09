import React from "react";
import { FiLogOut } from "react-icons/fi";

const DoneHeader = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  

  return (
    <header className="done-header">
      <div className="done-header__logo-container">
        <img className="done-header__logo" src="/logo.svg" alt="Done list logo" />
        <h1 className="done-header__main-title"> Your Done List </h1>
      </div>
      <FiLogOut className="done-header__logout-icon" title={"Log out"}
       onClick={logOut} />
      <button className="done-header__logout-button" type="button" onClick={logOut}>
        Log out
      </button>
    </header>
  );
};

export default DoneHeader;
