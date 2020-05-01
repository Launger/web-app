import React from "react";
import { useStore } from "react-hookstore";

import "./Points.css";

const Points = ({ppm}) => {
  const [togglePoints, setTogglePoints] = useStore("togglePoints");
  const [sPoints] = useStore("sPoints");
  const [points] = useStore("points");
  const {totalPoints} = points;

  const handleTogglePoints = () => {
    if(togglePoints === "real"){
      // console.log("points toggled: ppm")
      setTogglePoints("ppm");
    } else if(togglePoints === "ppm"){
      // console.log("points toggled: hidden");
      setTogglePoints("hidden");
    } else{
      // console.log("points toggled: real")
      setTogglePoints("real");
    }
  }

  // TODO: add tool tip to show what happens when clicked
  return (
    <div className="Points actionable" onClick={handleTogglePoints}>
      {(togglePoints === "real")?Math.round(totalPoints+sPoints)+" ":""}
      {(togglePoints === "ppm")?(Math.round(totalPoints) + Number((ppm)?Math.round(sPoints - sPoints%ppm):Math.round(sPoints))+" "):""}
      {(togglePoints === "hidden")?"":""}
      Points
    </div>
  );
};

export default Points;
