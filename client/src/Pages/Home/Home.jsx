import axios from "axios";
import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../../Validation/Validation";
import doneImage from "../../../src/done-image.png";

const Home = () => {
  let navigate = useNavigate();
  const apiPort = process.env.REACT_APP_API_PORT;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let validateEmail = (email) => {
    let isEmailValid = { status: true, emailError: "" };
    if (!email) {
      isEmailValid.status = false;
      isEmailValid.emailError = "Email is required";
    } else if (!validEmail.test(email)) {
      isEmailValid.status = false;
      isEmailValid.emailError = "Email is invalid";
    }
    return isEmailValid;
  };

  const validatePassword = (password) => {
    let isPasswordValid = { status: true, passwordError: "" };
    if (!password) {
      isPasswordValid.status = false;
      isPasswordValid.passwordError = "Password is required";
    } else if (!validPassword.test(password)) {
      isPasswordValid.status = false;
      isPasswordValid.passwordError = "Password is invalid";
    }
    return isPasswordValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let emailIsValid = validateEmail(email);
    let passwordIsValid = validatePassword(password);

    if (emailIsValid.status && passwordIsValid.status) {
      try {
        await axios
          .post(`http://localhost:${apiPort}/login/`, {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate("/donelist");
          });
      } catch (err) {
        console.log(err);
        setErrorMessage("Invalid Credentials");
      }
    } else {
      setEmailError(emailIsValid.emailError);
      setPasswordError(passwordIsValid.passwordError);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let emailIsValid = validateEmail(email);
    let passwordIsValid = validatePassword(password);

    if (emailIsValid.status && passwordIsValid.status) {
      try {
        await axios
          .post(`http://localhost:${apiPort}/register/`, {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate("/donelist");
          });
      } catch (err) {
        console.log(err);
        setErrorMessage(`Email: ${email} already exists`);
      }
    } else {
      setEmailError(emailIsValid.emailError);
      setPasswordError(passwordIsValid.passwordError);
    }
  };

  return (
    <>
      <article className="home__article">
        <p className="home_paragraph-first">
          This is the place where you write down <br /> all of the things that
          you’ve already done.
        </p>
        <p className="home_paragraph">
          Every time you log in, you will feel <br /> accomplished, grateful,
          productive and encouraged to do more!
        </p>
      </article>
      <div className="home__second-section">
        <div className="home__form-section">
          <p className="home__form-title">Ready to start accomplishing? </p>
          <form className="home__form">
            <label className="home__label" htmlFor="email">
              Email
            </label>
            <input
              className="home__input"
              type="text"
              name="Email"
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"
            />
            {emailError && <p className="error">{emailError}</p>}
            <label className="home__label" htmlFor="password">
              Password
            </label>
            <input
              className="home__input"
              type="password"
              name="Password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"
              aria-label="password"
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <div className="home__button-container">
              <button
                className="home__button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="home__button"
                type="button"
                onClick={handleRegister}
              >
                Signup
              </button>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
        <div className="home__img-container">
          <img src={doneImage} alt="Woman who is happy to have finished a task and is sitting in front of a desk with her laptop open" />
        </div>
      </div>
    </>
  );
};

export default Home;
