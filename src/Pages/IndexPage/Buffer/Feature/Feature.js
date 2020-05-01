import React from "react";

import "./Feature.css";

const Feature = ({
  right = false,
  title,
  description,
  illustration,
  newLabel = false,
}) => {
  if (right) {
    return (
      <div className="Feature">
        <div className="left">
          <div className="illustration">{illustration}</div>
        </div>
        <div className="right">
          <div className="title">
            <h3>{title}</h3>
            {newLabel && <div className="newLabel">NEW</div>}
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Feature">
        <div className="left">
          <div className="title">
            <h3>{title}</h3>
            {newLabel && <div className="newLabel">NEW</div>}
          </div>
          <div className="description">{description}</div>
        </div>
        <div className="right">
          <div className="illustration">{illustration}</div>
        </div>
      </div>
    );
  }
};

export default Feature;
