import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["957ac555dAC74B637B07b792A081C769"].youtubeURL}/>
    </div>
  );
};

export default Widget;