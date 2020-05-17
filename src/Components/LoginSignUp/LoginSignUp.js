import React, {useState} from "react";
import {useStore} from "react-hookstore";
import firebase from "firebase/app";
import {Link} from "react-router-dom";

import googleIcon from "../../Static/google-icon.svg";

import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [, setLoggedIn] = useStore("loggedIn");  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState("hide");
  const [error, setError] = useState(null);

  //Login
  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (email.value.length < 4) {
      setError("Please enter an email address.");
      return;
    }
    if (password.value.length < 6) {
      setError("Password needs a minimum of 6 characters.");
      return;
    }
    if (password.value.includes("123456")){
      setError(`Password ${password.value} is not secure.`)
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(data => {
        // console.log(data);
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
      })
      .catch(error => {
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

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // console.log(result);
        // sessionStorage.setItem("accessToken", result.credential.accessToken);
        // console.log(loggedIn);
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
      })
      .catch(error => {
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

  //Sign up
  const handleSignUp = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (email.value.length < 4) {
      setError("Please enter an email address.");
      return;
    }
    if (password.value.length < 6) {
      setError("Password needs a minimum of 6 characters.");
      return;
    }
    if (password.value.includes("123456")){
      setError(`Password ${password.value} is not secure.`)
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
          widgets: []
        })
      })
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        // console.log(data2);
      })
      .catch( (error) => {
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
    if(showPassword === "show")
      setShowPassword("hide");
    else 
      setShowPassword("show");
  }

  return (
    <div className="LoginSignUp">
      <form onSubmit={(isLogin)?handleLogin:handleSignUp}>
        <h1>{(isLogin)?"Login":"Sign up"}</h1>
            <input id="email" type="email" placeholder="Email" name="email" />
            <div className="password-inputs">
              <input
                type={showPassword === "show" ? "password" : "text"}
                placeholder="Password"
                name="password"
              />
              <span onClick={handleShowPassword} className="show-hide">
                {showPassword}
              </span>
            </div>
              {error && <span className="error">*{error}</span>}
            <input id="submit" type="submit" value={(isLogin)?"Login":"Sign up"} />
            {!isLogin && 
              <span className="agreement">
                By clicking on Sign up, you agree to Launger's 
                {" "}<Link to="/terms">Terms of Service</Link>, 
                {" "}<Link to="/privacy">Privacy Policy</Link>, and
                {" "}<Link to="/cookies">Cookie Policy</Link>.
              </span>
            }
            <div id="seperator"></div>
            <button type="button" id="google-login" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google sign in" />
              <span>{(isLogin)?"Login":"Sign up"} with Google</span>
            </button>
          {(isLogin)?
            <span className="footer">
              Don't have an account yet? <span className="underline actionable" onClick={() => setIsLogin(false)}>Sign up here</span>
            </span>:
            <span className="footer">
              Already have an account? <span className="underline actionable" onClick={() => setIsLogin(true)}>Login here</span>
            </span>
          }
      </form>
    </div>
  );
};

export default LoginSignUp;
