import React from "react";

const Header = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <header>
        <h1> Your Done List </h1>
        <button type="button" onClick={logOut}>
          Log out
        </button>
      </header>
    </>
  );
};

export default Header;
