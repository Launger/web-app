import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig";
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["30a55BA55827E87706dfD5941D6B034F"].youtubeURL} />
    </div>
  );
};

export default Widget;
