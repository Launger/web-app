import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["Aa1B87eb3d0Ccd6c77A4D82b93958e39"].youtubeURL}/>
    </div>
  );
};

export default Widget;