import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["b5492f1C4aCFCBeE0856275d291736ec"].youtubeURL}/>
    </div>
  );
};

export default Widget;