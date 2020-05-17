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
      setTogglePoints("ppm");
    } else if(togglePoints === "ppm"){
      setTogglePoints("hidden");
    } else{
      setTogglePoints("real");
    }
  }

  // TODO: add tool tip to show what happens when clicked
  return (
    <div className="Points actionable" onClick={handleTogglePoints}>
      {(togglePoints === "real") && Math.round(totalPoints+sPoints)+" "}
      {(togglePoints === "ppm") && (Math.round(totalPoints) + Number((ppm)?Math.round(sPoints - sPoints%ppm):Math.round(sPoints))+" ")}
      Points
    </div>
  );
};

export default Points;
