import React, { useState } from "react";
import { useLocalStore } from "Utils/Hooks";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import NavBar from "Components/NavBar/NavBar";

import illustration from "./login-illustration.svg";
import googleIcon from "./google-icon.svg";
import "./LoginPage.css";

const LoginPage = ({ history }) => {
  const [, setLoggedIn] = useLocalStore("loggedIn");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // Login with email and password
  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(data => {
        setLoggedIn(true);
        history.push("/browse");
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };

  // Login with Google
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        setLoggedIn(true);
        history.push("/browse");
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };

  document.title = "Launger - Login";
  return (
    <div className="LoginPage">
      <NavBar />
      <div className="background col-md-9"></div>
      <div className="container page-content">
        <div className="row">
          <img src={illustration} alt="login signup illustration" className="illustration col-md-8" />
          <form onSubmit={handleLogin} className="col-md-4 mx-0">
            <h1>Login</h1>
            <input id="email" type="email" placeholder="Email" name="email" />
            <div className="password-inputs">
              <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" />
              <span onClick={() => setShowPassword(!showPassword)} className="show-hide">
                {showPassword ? "hide" : "show"}
              </span>
            </div>
            {error && <span className="error">*{error}</span>}
            <input id="submit" type="submit" value="Login" />
            <div id="seperator"></div>
            <button type="button" id="google-login" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google sign in" />
              <span>Login with Google</span>
            </button>
            <span className="footer mx-auto">
              Don't have an account yet?<Link to="/signup"> Sign up here.</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
