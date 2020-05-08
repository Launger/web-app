import React from "react";

import Timer from "../../Timer/Timer";
import Tips from "../../../Pages/BreakPage/Tips";

import "./Widget.css";

const Widget = () => {

  return (
    <div className="Classic-Widget">
      <div className="classic-widget-content">
        <h1>Classic</h1>
        <Timer />
      </div>
      <Tips />
    </div>
  );
};

export default Widget;
