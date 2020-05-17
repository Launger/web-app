import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["E51c2C6cCfC8276Ec9dFb9fA664c8E92"].youtubeURL}/>
    </div>
  );
};

export default Widget;