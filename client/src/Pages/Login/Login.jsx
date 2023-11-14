import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../../Validation/Validation";

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
            const token = res.data.token;
            localStorage.setItem("token", token);
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
      <div className="login__second-section">
        <div className="login__form-section">
          <h2 className="login__form-title">Ready to start accomplishing? </h2>
          <h3 className="login__guest-title">Enter as a guest</h3>
          <button
            className="login__guest-button"
            type="button"
          >
            Enter
          </button>
          <hr className="divider"/>
          <h3 className="login__email-title">Enter with email</h3>
          <form className="login__form">
            <label className="login__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="login__input"
              type="text"
              name="Email"
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email..."
            />
            {emailError && <p className="error">{emailError}</p>}
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              type="password"
              name="Password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password..."
              aria-label="password"
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <div className="login__button-container">
              <button
                className="login__button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="login__button"
                type="button"
                onClick={handleRegister}
              >
                Signup
              </button>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
