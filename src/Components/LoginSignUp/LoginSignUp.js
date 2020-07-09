import React, { useState } from "react";
import { useLocalStore } from "Utils/Hooks";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

import googleIcon from "Static/google-icon.svg";

import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [, setLoggedIn] = useLocalStore("loggedIn");

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // Shows error message when there is error in Login or Signup flows
  const catchError = error => {
    const { code, message } = error;
    if (code === "auth/weak-password") {
      setError("Please choose a stronger password.");
    } else {
      setError(message);
    }
    console.log(error);
  };

  // Login with email and password
  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (email.value.length < 4) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.value.length < 6) {
      setError("Passwords are 6 characters minimum.");
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(data => {
        // console.log(data);
        setLoggedIn(true);
      })
      .catch(error => catchError(error));
  };

  // Sign up
  const handleSignUp = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (email.value.length < 4) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.value.length < 6) {
      setError("Please choose a stronger password. (6 Characters minimum)");
      return;
    }
    if (password.value.includes("123456")) {
      setError(`"${password.value}" is not secure. Please choose a stronger password.`);
      return;
    }

    // Create user with email and password on Firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(data => {
        return firebase.firestore().doc(`users/${data.user.uid}/private/private`).set({
          totalPoints: 0,
          widgets: [],
        });
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch(error => catchError(error));
  };

  // Google Login/Signup
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(data => {
        if (!isLogin) {
          return firebase.firestore().doc(`users/${data.user.uid}/private/private`).set({
            totalPoints: 0,
            widgets: [],
          });
        } else {
          setLoggedIn(true);
        }
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch(error => catchError(error));
  };

  return (
    <div className="LoginSignUp">
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        <h1>{isLogin ? "Login" : "Sign up"}</h1>
        <input id="email" type="email" placeholder="Email" name="email" />
        <div className="password-inputs">
          <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" />
          <span onClick={() => setShowPassword(!showPassword)} className="show-hide">
            {showPassword ? "hide" : "show"}
          </span>
        </div>
        {error && <span className="error">*{error}</span>}
        <input id="submit" type="submit" value={isLogin ? "Login" : "Sign up"} />
        {!isLogin && (
          <span className="agreement">
            By clicking on Sign up, you agree to Launger's <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>, and{" "}
            <Link to="/cookies">Cookie Policy</Link>.
          </span>
        )}
        <div id="seperator"></div>
        <button type="button" id="google-login" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google sign in" />
          <span>{isLogin ? "Login" : "Sign up"} with Google</span>
        </button>
        {isLogin ? (
          <span className="footer">
            Don't have an account yet?{" "}
            <span className="underline actionable" onClick={() => setIsLogin(false)}>
              Sign up here
            </span>
          </span>
        ) : (
          <span className="footer">
            Already have an account?{" "}
            <span className="underline actionable" onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </span>
        )}
      </form>
    </div>
  );
};

export default LoginSignUp;
