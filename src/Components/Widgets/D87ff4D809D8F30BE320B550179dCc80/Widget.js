import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["D87ff4D809D8F30BE320B550179dCc80"].youtubeURL}/>
    </div>
  );
};

export default Widget;