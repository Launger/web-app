import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["BFfb93102323A036Fc337Bf729403bA2"].youtubeURL}/>
    </div>
  );
};

export default Widget;