import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig"
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["F394B4518af54D3289Ae063Db2b97F59"].youtubeURL}/>
    </div>
  );
};

export default Widget;