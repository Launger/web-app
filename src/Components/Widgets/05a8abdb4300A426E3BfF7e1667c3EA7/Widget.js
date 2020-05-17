import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["05a8abdb4300A426E3BfF7e1667c3EA7"].youtubeURL}/>
    </div>
  );
};

export default Widget;