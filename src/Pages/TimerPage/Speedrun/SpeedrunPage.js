import React, { useEffect, useState, useRef } from "react";
import { useStore } from "react-hookstore";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";

import NavBar from "../../../Components/NavBar/NavBar";
import Timer from "../../../Components/Timer/Timer";
import Points from "../../../Components/Points/Points";
import Todos from "../../../Components/Todos/Todos";

import widgetConfig from "../../../Components/Widgets/widgetConfig";
import { formatTime } from "../../../Helpers";

import "./SpeedrunPage.css";

const SpeedrunPage = ({ history }) => {
  const [timer, setTimer] = useStore("timer");
  const [sPoints, setSPoints] = useStore("sPoints");
  const [widget] = useStore("widget");

  const [workTimeLeft] = useState(
    Number(sessionStorage.getItem("totalTimeSpent"))
  );

  const widgetId =
    widget.id ||
    JSON.parse(sessionStorage.getItem("widget")).id ||
    "d27154EFDbCa05654074E41a8d542b53"; //Classic
  const ppm = widgetConfig[widgetId].ppm || 60;

  const startTime = useRef(null);

  const handleTakeABreak = () => {
    sessionStorage.setItem("totalTimeSpent", timer.time);
    history.push("/break");
  };

  useEffect(() => {
    startTime.current = new Date();
    setTimer({ time: workTimeLeft, isCountingdown: true });
    document.title = `Work - ${formatTime(workTimeLeft)}`;
    if (("Notification" in window) && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      let currentTime = new Date();
      let newTime =
        workTimeLeft + Math.floor((currentTime - startTime.current) / 1000);

      if (newTime !== timer.time) {
        setTimer({ ...timer, time: newTime });
        document.title = `Work - ${formatTime(newTime)}`;
        setSPoints(sPoints + (ppm * (newTime - timer.time)) / 60);
      } else {
        setTimer({ ...timer });
      }
    }, 500);

    onbeforeunload = (e) => {
      sessionStorage.setItem("widget", JSON.stringify({ id: widgetId }));
      sessionStorage.setItem("totalTimeSpent", timer.time);
      document.title = "Launger";
    };

    return () => {
      clearTimeout(ticker);
      document.title = "Launger";
    };
  });

  return (
    <div className="SpeedrunPage">
      <NavBar Points={() => <Points ppm={ppm} />} />
      <div className="page-content">
        <Timer speedrun={true} />
        <Todos speedrun={true} />
        {timer.time >= 5 * 60 - 1 ? (
          <input
            className="take-a-break"
            type="button"
            value="Take a break"
            onClick={handleTakeABreak}
            style={timer.time >= 5 * 60 ? { opacity: "1" } : {}}
          />
        ) : (
          <h1 className="take-a-breakh1">
            Take a break in {formatTime(5 * 60 - timer.time)}
          </h1>
        )}
        {("Notification" in window) &&
        Notification.permission !== "granted" ? (
          <Alert variant={"warning"} className="notification">
            Allow notifications as to be notified when the timer has finished.
          </Alert>
        ) : (
          <></>
        )}
        {/* <Alert variant={"warning"} className="refresh">Do not refresh the tab/window, you will lose points.</Alert> */}
      </div>
    </div>
  );
};

export default withRouter(SpeedrunPage);
