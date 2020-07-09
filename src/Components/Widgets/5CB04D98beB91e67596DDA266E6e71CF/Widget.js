import React from "react";

import Tips from "../../../Pages/BreakPage/Tips";

import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <iframe src="https://slither.io" frameBorder="0" title="slither.io" />
      <Tips />
    </div>
  );
};

export default Widget;
