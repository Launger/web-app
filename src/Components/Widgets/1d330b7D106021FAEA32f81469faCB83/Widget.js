import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["1d330b7D106021FAEA32f81469faCB83"].youtubeURL}/>
    </div>
  );
};

export default Widget;