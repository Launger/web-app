import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["178e5AB605baEc9c20821fB0F838146e"].youtubeURL}/>
    </div>
  );
};

export default Widget;