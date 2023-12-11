import React from "react";
import Logo from "../../src/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const DoneHeader = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="done-header">
      <div className="done-header__logo-container">
        <img className="done-header__logo" src={Logo} alt="Done list logo" />
        <h1 className="done-header__main-title"> Your Done List </h1>
      </div>
      <FontAwesomeIcon className="done-header__logout-icon" title={"Log out"}
        icon={faRightFromBracket} onClick={logOut} />
      <button className="done-header__logout-button" type="button" onClick={logOut}>
        Log out
      </button>
    </header>
  );
};

export default DoneHeader;
