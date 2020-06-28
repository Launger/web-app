import React from "react";

import Tips from "../../../Pages/BreakPage/Tips";

import "./Widget.css";

const Widget = () => {
  return (
    <div className="Widget">
      <div className="wrapper">
          <iframe
            className="content"
            src="https://slither.io"
            frameBorder="0"
            title="slither.io"
          />
          <div className="tips">
        <Tips />
      </div>
      </div>
    </div>
  );
};

export default Widget;
