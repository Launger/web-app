import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["6eE0F88ef7bDc873991E47EeD84Af01a"].youtubeURL}/>
    </div>
  );
};

export default Widget;