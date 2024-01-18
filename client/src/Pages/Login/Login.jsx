import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../../Validation/Validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginView, setLoginView] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    let isEmailValid = { status: true, emailError: "" };
    if (!email) {
      isEmailValid.status = false;
      isEmailValid.emailError = (
        <>
          <strong>Email is required.</strong> Please enter a valid email address
          (e.g., <strong>example@example.com</strong>).
        </>
      );
    } else if (!validEmail.test(email)) {
      isEmailValid.status = false;
      isEmailValid.emailError = (
        <>
          <strong>Email is invalid.</strong> Please enter a valid email address
          (e.g., <strong>example@example.com</strong>).
        </>
      );
    }
    return isEmailValid;
  };

  const validatePassword = (password) => {
    let isPasswordValid = { status: true, passwordError: "" };
    if (!password) {
      isPasswordValid.status = false;
      isPasswordValid.passwordError = (
        <>
          <strong>Password is required.</strong> Please enter a password with at
          least 8 characters, including a mix of letters, numbers, and special
          characters.
        </>
      );
    } else if (!validPassword.test(password)) {
      isPasswordValid.status = false;
      isPasswordValid.passwordError = (
        <>
          <strong>Password is invalid.</strong> Please enter a password with at
          least 8 characters, including a mix of letters, numbers, and special
          characters.
        </>
      );
    }
    return isPasswordValid;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleGuestLogin = () => {
    const token = "guest";
    localStorage.setItem("token", token);
    navigate("/donelist");
  };

  const handleUserLogin = () => {
    setLoginView(true);
    setRegistered(true);
  };

  const handleUserRegister = () => {
    setLoginView(true);
    setRegistered(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let emailIsValid = validateEmail(email);
    let passwordIsValid = validatePassword(password);

    if (emailIsValid.status && passwordIsValid.status) {
      try {
        await axios
          .post(`http://localhost:${process.env.REACT_APP_API_ENDPOINT}/login/`, {
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
          .post(`http://localhost:${process.env.REACT_APP_API_ENDPOINT}/register/`, {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate("/donelist");
          });
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 409) {
          setErrorMessage(`Email: ${email} already exists`);
          setRegistered(true);
        } else {
          setErrorMessage("Registration failed. Please try again later.");
        }
      }
    } else {
      setEmailError(emailIsValid.emailError);
      setPasswordError(passwordIsValid.passwordError);
    }
  };

  return (
    <>
      <div className="login">
        <h2 className="login__form-title">Ready to start accomplishing? </h2>
        <div className="login__choose-section">
          <div className="login__guest-section">
            <h3 className="login__guest-title">Enter as a guest</h3>
            <button
              className="login__guest-button"
              type="button"
              onClick={handleGuestLogin}
            >
              Enter
            </button>
          </div>
          <hr className="login__divider" />
          <div className="login__form-section">
            {loginView ? (
              <>
                <h3 className="login__email-title">Enter with email</h3>
                <form className="login__form">
                  <label className="login__label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className={
                      emailError
                        ? "login__input login__input--error"
                        : "login__input"
                    }
                    type="text"
                    name="Email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email..."
                    required
                  />
                  {emailError && (
                    <div className="login__error" role="alert">
                      <span aria-hidden="true" className="login__error-icon">
                        ❌
                      </span>
                      {emailError}
                    </div>
                  )}
                  <label className="login__label" htmlFor="password">
                    Password
                    <div className="password-input-container">
                      <input
                        className={
                          passwordError
                            ? "login__input login__input--error"
                            : "login__input"
                        }
                        type={showPassword ? "text" : "password"}
                        name="Password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password..."
                        aria-label="password"
                        required
                      />
                      <div
                        className="password-toggle-icon"
                        onClick={handleTogglePassword}
                        role="button"
                        tabIndex="0"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    {passwordError && (
                      <div className="login__error" role="alert">
                        <span aria-hidden="true" className="login__error-icon">
                          ❌
                        </span>
                        {passwordError}
                      </div>
                    )}
                  </label>
                  {registered ? (
                    <button
                      className="login__button"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  ) : (
                    <div className="login__button-container">
                      <button
                        className="login__button"
                        type="button"
                        onClick={handleRegister}
                      >
                        Signup
                      </button>
                    </div>
                  )}
                  {errorMessage && (
                    <p className="login__error">{errorMessage}</p>
                  )}
                </form>
              </>
            ) : (
              <>
                <h3 className="login__email-title">Enter with email</h3>
                <div className="login__buttons">
                  <button
                    className="login__guest-button"
                    type="button"
                    onClick={handleUserLogin}
                  >
                    Login
                  </button>
                  <button
                    className="login__guest-button"
                    type="button"
                    onClick={handleUserRegister}
                  >
                    Register
                  </button>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;