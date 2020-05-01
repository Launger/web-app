import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["4048Ef5e661E3B5248c1658E08540A0d"].youtubeURL}/>
    </div>
  );
};

export default Widget;