import React, { lazy } from "react";

// import "./TimerPage.css";

const Pomodoro = lazy(() => import("./Pomodoro/PomodoroPage"));
const Speedrun = lazy(() => import("./Speedrun/SpeedrunPage"));
const Tracker = lazy(() => import("./Tracker/TrackerPage"));

const TimerPage = ({ match }) => {
  const mode = match.params.mode;
  switch (mode) {
    case "pomodoro":
      return <Pomodoro />;
    case "speedrun":
      return <Speedrun />;
    case "tracker":
      return <Tracker />;
    default:
      return <Pomodoro />;
  }
};

export default TimerPage;
