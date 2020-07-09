import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig.js";
import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["Ee0Dff7436cD4009676a908cEfD6cd5C"].youtubeURL} />
    </div>
  );
};

export default Widget;
