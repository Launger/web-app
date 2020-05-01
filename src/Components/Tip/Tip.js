import React from "react";

import templateIcon from "./tip-icon.svg";
import "./Tip.css";

const Tips = ({ message, icon}) => {

  const tipIcon = icon || templateIcon;

  return (
    <div className="Tip">
      <img src={tipIcon} alt="tip icon"/>
      {message}
    </div>
  );
};

export default Tips;