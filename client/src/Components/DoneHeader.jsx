import React from "react";
import Logo from "../../src/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const DoneHeader = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="done__header">
      <div className="logo_container">
        <img className="logo" src={Logo} alt="Done list logo" />
        <h1 className="main__title"> Your Done List </h1>
      </div>
      <FontAwesomeIcon className="logout" icon={faRightFromBracket} onClick={logOut} />
      <button className="done-button" type="button" onClick={logOut}>
        Log out
      </button>
    </header>
  );
};

export default DoneHeader;
