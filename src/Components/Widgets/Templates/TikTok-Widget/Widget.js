import React from "react";

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
      <h4>*Better version of TikTok widgets will come out soon!</h4>
      <h1 className="actionable go-to-link" onClick={handleClick}>{text}</h1>
    </div>
  );
};

export default Widget;