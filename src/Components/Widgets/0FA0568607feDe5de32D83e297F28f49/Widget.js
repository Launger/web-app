import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["0FA0568607feDe5de32D83e297F28f49"].youtubeURL}/>
    </div>
  );
};

export default Widget;