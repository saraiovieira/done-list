import "./Welcome.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";

const Welcome = () => {
  let navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="welcome">
      <article className="welcome__article">
        <div className="welcome__article-description">
          <h2 className="welcome__paragraph--bold">
            Log completed tasks and watch your achievements pile up
          </h2>
          <p className="welcome__paragraph--middle">
            Your personal space to celebrate your accomplishments, track your
            progress, and boost your productivity.
          </p>
          <button
            className="welcome__button"
            type="button"
            onClick={handleRedirect}
          >
            Start your journey to success today
            <IoMdArrowRoundForward className="welcome__arrow" />
          </button>
        </div>
      </article>

      <div className="welcome__img-container">
        <img
          className="welcome__img"
          src="/done-image.png"
          alt="Woman who is happy to have finished a task and is sitting in front of a desk with her laptop open"
        />
      </div>
    </div>
  );
};

export default Welcome;
