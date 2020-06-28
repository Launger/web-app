import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useStore } from "react-hookstore";
import { useSessionStore, useLocalStore } from "Utils/Hooks";
import firebase from "firebase/app";

import ThemeButton from "./ThemeButton";

import { updateFireStorePoints } from "Utils";
import laungerLogoBlack from "../../Static/launger-logo.svg";
import "./NavBar.css";

const NavBar = ({ Timer, Points, history }) => {
  const [theme, setTheme] = useLocalStore("theme", false);
  const [loggedIn, setLoggedIn] = useLocalStore("loggedIn");
  const [user, setUser] = useSessionStore("user");
  const [sPoints, setSPoints] = useStore("sPoints");

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const handleLogout = () => {
    updateFireStorePoints(sPoints)
      .then(() => {
        sessionStorage.clear();
        return firebase.auth().signOut();
      })
      .then(() => {
        //Logout from Firebase Auth is SUCESSFUL
        setLoggedIn(false);
        setSPoints(0);
        setUser({ ...user, totalPoints: 0 });
        history.push("/");
      })
      .catch(err => console.log(err)); //Logout from Firebase Auth is NOT successful
  };

  return (
    <div className="NavBar">
      <nav className={`navbar navbar-expand-md navbar-${theme}`}>
        <Link to="/" className="navbar-brand">
          <img src={laungerLogoBlack} alt="Launger logo" className={"logo " + theme} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "var(--primary-text-color, black)" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse" style={{ color: "var(--primary-text-color)" }}>
                Browse
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {Timer && (
              <li className="nav-link">
                <Timer />
              </li>
            )}
            {Points && (
              <li className="points nav-link">
                <Points />
              </li>
            )}
            {loggedIn ? (
              <li className=" points nav-item">
                <Link className="nav-link" onClick={handleLogout} to="#" style={{ color: "var(--primary-text-color)" }}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="points nav-item">
                  <Link to="/login" className="nav-link" id="login-btn" style={{ color: "var(--primary-text-color)" }}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" id="signup-btn">
                    Sign up
                  </Link>
                </li>
              </>
            )}
            <li className="nav-link actionable" onClick={toggleTheme} id="theme">
              <ThemeButton />
            </li>
          </ul>
        </div>
      </nav>
      <div className="color-accent">
        <div className="gradient-accent"></div>
        <svg id="corner-piece" width="66" height="69" viewBox="0 0 66 69" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0H6C39.1371 0 66 26.8629 66 60V69C66 35.8629 39.1371 9 6 9H0V0Z" fill="#F94E83" />
          <path fillRule="evenodd" clipRule="evenodd" d="M66 0H6C39.1371 0 66 26.8629 66 60V0Z" fill="var(--primary-bg, white)" />
        </svg>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
