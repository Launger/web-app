import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

import "./ClockSpinner.css";

const ClockSpinner = () => {
  return (
    <div className="ClockSpinner">
      <ClockLoader loading size={50} color="orange"/>
    </div>
  );
};

export default ClockSpinner;
