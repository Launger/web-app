import React from "react";

import Template from "../Templates/TikTok/Widget";

import "./Widget.css";

const Widget = () => {
  const id = "39C1FFF780a0a1097D8548aBCb4Ddb02";

  return (
    <div className="Widget">
      <Template id={id} text="Go to TikTok Discover"/>
    </div>
  );
};

export default Widget;