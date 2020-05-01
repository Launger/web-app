import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["7167D1eb5A5e7a94bf48246A27ea7fe8"].youtubeURL}/>
    </div>
  );
};

export default Widget;