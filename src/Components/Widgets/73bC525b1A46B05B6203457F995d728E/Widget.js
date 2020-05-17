import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["73bC525b1A46B05B6203457F995d728E"].youtubeURL}/>
    </div>
  );
};

export default Widget;