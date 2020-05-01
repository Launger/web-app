import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["a07eC28ADF53601C643A9fee22581218"].youtubeURL}/>
    </div>
  );
};

export default Widget;