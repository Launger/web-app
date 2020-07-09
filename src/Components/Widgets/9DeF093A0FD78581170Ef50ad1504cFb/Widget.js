import React from "react";

import Template from "../Templates/YouTube/Widget";

import config from "../widgetConfig";
// import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <Template src={config["9DeF093A0FD78581170Ef50ad1504cFb"].youtubeURL} />
    </div>
  );
};

export default Widget;
