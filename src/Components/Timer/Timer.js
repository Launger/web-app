import React, { useState, useEffect } from "react";
import { useStore } from "react-hookstore";

import { formatTime } from "Utils";
import "./Timer.css";

const Timer = ({ speedrun = false }) => {
  const [timer] = useStore("timer");
  const [theme] = useStore("theme");
  const [totalTime] = useStore("totalTime");

  const [color, setColor] = useState({ color: "black" });

  const { time } = timer;

  useEffect(() => {
    setColor({ color: "var(--primary-text-color, black)" });
  }, []);

  useEffect(() => {
    if (timer.isCountingdown) {
      setColor({ color: "var(--primary-text-color)" });
    } else {
      setColor({ color: "red" });
    }
  }, [timer.isCountingdown]);

  useEffect(() => {
    if (speedrun && totalTime > 0 && time > totalTime * 60) {
      setColor({ color: "red" });
    } else setColor({ color: "var(--primary-text-color)" });
  }, [time, totalTime, speedrun]);

  useEffect(() => {
    setColor({ color: "var(--primary-text-color, black)" });
  }, [theme]);

  return (
    <div className="Timer" style={color}>
      {formatTime(time)}
      {speedrun && `/${formatTime(totalTime * 60)}`}
    </div>
  );
};

export default Timer;
