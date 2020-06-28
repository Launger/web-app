import React, { useState } from "react";
import { useLocalStore } from "Utils/Hooks";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

import NavBar from "Components/NavBar/NavBar";

import illustration from "./signup-illustration.svg";
import googleIcon from "./google-icon.svg";
import "./SignupPage.css";

const SignupPage = ({ history }) => {
  const [, setLoggedIn] = useLocalStore("loggedIn");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

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
      setError(`${password.value} is not secure. Please choose a stronger password.`);
      return;
    }

    // Create user with email and pass.
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(data => {
        // console.log(data);
        // console.log(loggedIn);
        return firebase.firestore().doc(`users/${data.user.uid}/private/private`).set({
          totalPoints: 0,
          widgets: [],
        });
      })
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        // console.log(data2);
        history.push("/browse");
      })
      .catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setError("Please choose a stronger password.");
        } else {
          setError(errorMessage);
        }
        console.log(error);
      });
  };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(data => {
        // console.log(data);
        // console.log(loggedIn);
        return firebase.firestore().doc(`users/${data.user.uid}/private/private`).set({
          totalPoints: 0,
          widgets: [],
        });
      })
      .then(data2 => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        console.log(data2);
        history.push("/browse");
      })
      .catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setError("The password is too weak.");
        } else {
          setError(errorMessage);
        }
        console.log(error);
      });
  };

  const handleShowPassword = () => {
    if (showPassword === "show") setShowPassword("hide");
    else setShowPassword("show");
  };

  document.title = "Launger - Sign up";
  return (
    <div className="SignupPage">
      <NavBar />
      <div className="background col-md-9"></div>
      <div className="container page-content">
        <div className="row">
          <img src={illustration} alt="login signup illustration" className="illustration col-md-8" />
          <form onSubmit={handleSignUp} className="col-md-4 mx-0">
            <h1>Sign Up</h1>
            <input id="email" type="email" placeholder="Email" name="email" />
            <div className="password-inputs">
              <input type={showPassword === "show" ? "password" : "text"} placeholder="Password" name="password" />
              <span onClick={handleShowPassword} className="show-hide">
                {showPassword}
              </span>
            </div>
            {error && <span className="error">*{error}</span>}
            <input id="submit" type="submit" value="Sign up" />
            <span className="agreement">
              By clicking on Sign up, you agree to Launger's <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>, and{" "}
              <Link to="/cookies">Cookie Policy</Link>.
            </span>
            <div id="seperator"></div>
            <button type="button" id="google-login" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google sign in" />
              <span>Sign up with Google</span>
            </button>
            <span className="footer mx-auto">
              Already have an account?<Link to="/login"> Login here.</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
