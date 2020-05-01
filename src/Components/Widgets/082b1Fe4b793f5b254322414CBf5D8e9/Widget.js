import React from "react";

import Template from "../Templates/YT-Widget/Widget";

import config from "../widgetConfig"
import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["082b1Fe4b793f5b254322414CBf5D8e9"].youtubeURL}/>
    </div>
  );
};

export default Widget;