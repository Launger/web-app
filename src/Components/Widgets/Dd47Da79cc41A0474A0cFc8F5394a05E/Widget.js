import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["Dd47Da79cc41A0474A0cFc8F5394a05E"].youtubeURL}/>
    </div>
  );
};

export default Widget;