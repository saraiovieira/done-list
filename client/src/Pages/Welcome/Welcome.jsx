import "./Welcome.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import doneImage from "../../../src/done-image.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Welcome = () => {
  let navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  }

  return (
    <div className="welcome">
      <article className="welcome__article">
      <div className="welcome__article-description">
        <p className="welcome__paragraph--bold">
          Log completed tasks and watch your achievements pile up
        </p>
        <p className="welcome__paragraph--middle">
          Your personal space to celebrate your accomplishments, track your progress, and boost your productivity.
        </p>
        <button
          className="welcome__button"
          type="button"
          onClick={handleRedirect}
        >
          Start your journey to success today
          <FontAwesomeIcon className="welcome__arrow" icon={faArrowRight} />
        </button>
        </div>
      </article>
      
      <div className="welcome__img-container">
        <img className="welcome__img" src={doneImage} alt="Woman who is happy to have finished a task and is sitting in front of a desk with her laptop open" />
      </div>
    </div>
  );
};

export default Welcome;