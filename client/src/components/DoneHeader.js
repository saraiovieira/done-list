import React from "react";

const Header = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.77 4.93l1.4 1.4L8.43 19.07l-5.6-5.6l1.4-1.4l4.2 4.2L19.77 4.93m0-2.83L8.43 13.44l-4.2-4.2L0 13.47l8.43 8.43L24 6.33L19.77 2.1z"
          />
        </svg>
        <h1> Your Done List </h1>
        <button type="button" onClick={logOut}>
          Log out
        </button>
      </header>
    </>
  );
};

export default Header;
