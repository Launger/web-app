import React from "react";
import { useStore } from "react-hookstore";
import { useSessionStore } from "Utils/Hooks";

import "./Points.css";

const Points = ({ ppm }) => {
  const [user] = useSessionStore("user");
  const [togglePoints, setTogglePoints] = useStore("togglePoints");
  const [sPoints] = useStore("sPoints");

  const handleTogglePoints = () => {
    if (togglePoints === "real") {
      setTogglePoints("ppm");
    } else if (togglePoints === "ppm") {
      setTogglePoints("hidden");
    } else {
      setTogglePoints("real");
    }
  };

  // TODO: add tool tip to show what happens when clicked
  return (
    <div className="Points actionable" onClick={handleTogglePoints}>
      {togglePoints === "real" && Math.round(user.totalPoints + sPoints) + " "}
      {togglePoints === "ppm" && Math.round(user.totalPoints) + Number(ppm ? Math.round(sPoints - (sPoints % ppm)) : Math.round(sPoints)) + " "}
      Points
    </div>
  );
};

export default Points;
