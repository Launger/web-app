import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["123F49562D1e7dC10b3B255F0969D29d"].youtubeURL}/>
    </div>
  );
};

export default Widget;