import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["833FD9411883E3a4861C758640EeB386"].youtubeURL}/>
    </div>
  );
};

export default Widget;