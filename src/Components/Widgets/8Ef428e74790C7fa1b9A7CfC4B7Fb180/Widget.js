import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig";
import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["8Ef428e74790C7fa1b9A7CfC4B7Fb180"].youtubeURL} />
    </div>
  );
};

export default Widget;
