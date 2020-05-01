import React from "react";

import "./Tooltip.css";

const Tooltip = ({text, pointing}) => {
  if(pointing === "bottom"){
    return (
      <div className="Tooltip">
        <div className="bubble">
          <svg className="bottom" width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0L13.4474 15L26.8948 0L13.4474 0L0 0Z" fill="blue"/>
          </svg>
          {text}
        </div>
      </div>
    )
  } else if(pointing === "top"){
    return (
      <div className="Tooltip">
        <div className="bubble">
          <svg className="top" width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M26.8948 15L13.4474 -1.78814e-06L-3.20611e-06 15L13.4474 15L26.8948 15Z" fill="blue"/>
          </svg>
          {text}
        </div>
      </div>
    )
  } else if(pointing === "left"){
    return (
      <div className="Tooltip">
        <div className="bubble">
          <svg className="left" width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 0L-1.78814e-06 13.4474L15 26.8948L15 13.4474L15 0Z" fill="blue"/>
          </svg>
          {text}
        </div>
      </div>
    )
  } else if(pointing === "right"){
    return (
      <div className="Tooltip">
        <div className="bubble">
        <svg className="right" width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 26.8948L15 13.4474L0 -3.20611e-06L0 13.4474L0 26.8948Z" fill="blue"/>
        </svg>
        {text}
        </div>
      </div>
    )
  } else {
    return (
      <div className="Tooltip">
        <div className="bubble">
          {text}
        </div>
      </div>
    );
  }
};

export default Tooltip;
