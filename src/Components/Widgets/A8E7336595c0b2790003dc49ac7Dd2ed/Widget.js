import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["A8E7336595c0b2790003dc49ac7Dd2ed"].youtubeURL}/>
    </div>
  );
};

export default Widget;