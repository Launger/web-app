import React from "react";

import Timer from "../../Timer/Timer";

import "./Widget.css";

const Widget = () => {

  return (
    <div className="Widget">
      <div className="container">
        <h1>Classic</h1>
        <Timer />
      </div>
    </div>
  );
};

export default Widget;
