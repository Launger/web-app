import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig";
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["6492F5db6Fcd0d0e003C37E5e067f4b1"].youtubeURL} />
    </div>
  );
};

export default Widget;
