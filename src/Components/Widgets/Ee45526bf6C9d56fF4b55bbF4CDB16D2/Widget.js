import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig";
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["Ee45526bf6C9d56fF4b55bbF4CDB16D2"].youtubeURL}/>
    </div>
  );
};

export default Widget;