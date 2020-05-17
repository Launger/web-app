import React from "react";

import Tips from "../../../../Pages/BreakPage/Tips";

import config from "../../widgetConfig";
import "./Widget.css";

const Widget = ({id, text, onClick}) => {
  const handleClick = () => {
    if(typeof(onClick) === "function"){
      onClick();
    } else {
      window.open(config[id].tiktokURL, "_blank");
    }
  }

  return (
    <div className="WidgetTemplate">
      <div className="container">
        <h4>*Better version of TikTok widgets will come out soon!</h4>
        <h1 className="actionable go-to-link" onClick={handleClick}>{text}</h1>
      </div>
      <Tips />
    </div>
  );
};

export default Widget;