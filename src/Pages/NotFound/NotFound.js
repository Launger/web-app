import React from "react";
import {Link, Redirect} from "react-router-dom"

import "./NotFound.css";

const NotFound = () => {
  document.title = "Launger - Page Not Found";

  if(window.location.pathname === "/timer" || window.location.pathname === "/timer/" )
    return <Redirect to="/timer/pomodoro" />
  else
    return (
      <div className="NotFound">
        <h1>404 Could not find page</h1>
        <Link to="/">Main Page</Link>{" "}
      </div>
    );
};

export default NotFound;
