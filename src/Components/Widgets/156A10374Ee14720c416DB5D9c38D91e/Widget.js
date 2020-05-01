import React from "react";

import Template from "../Templates/TikTok-Widget/Widget";

import "./Widget.css";

const Widget = () => {
  const id = "156A10374Ee14720c416DB5D9c38D91e";

  return (
    <div className="Widget">
      <Template id={id} text="Go to TikTok"/>
    </div>
  );
};

export default Widget;