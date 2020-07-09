import React, { useEffect, useState, useRef } from "react";
import { useStore } from "react-hookstore";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";

import NavBar from "Components/NavBar/NavBar";
import Timer from "Components/Timer/Timer";
import Points from "Components/Points/Points";
import Todos from "Components/Todos/Todos";

import widgetConfig from "Components/Widgets/widgetConfig";
import { formatTime } from "Utils";

import "./SpeedrunPage.css";

const SpeedrunPage = ({ history }) => {
  const [timer, setTimer] = useStore("timer");
  const [sPoints, setSPoints] = useStore("sPoints");
  const [widget] = useStore("widget");
  const [totalTime] = useStore("totalTime");

  const [workTimeLeft] = useState(Number(sessionStorage.getItem("totalTimeSpent")));
  //FIXME : Temporary
  const progressRing = useRef({});

  const widgetId = widget.id || JSON.parse(sessionStorage.getItem("widget")).id || "d27154EFDbCa05654074E41a8d542b53"; //Classic
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
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    //FIXME : Temporary
    setTimeout(() => {
      progressRing.current = { transition: "all 1s linear" };
    }, 100);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      let currentTime = new Date();
      let newTime = workTimeLeft + Math.floor((currentTime - startTime.current) / 1000);

      if (newTime !== timer.time) {
        setTimer({ ...timer, time: newTime });
        document.title = `Work - ${formatTime(newTime)}`;
        setSPoints(sPoints + (ppm * (newTime - timer.time)) / 60);
      } else {
        setTimer({ ...timer });
      }
    }, 500);

    onbeforeunload = e => {
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
        <svg className="progress-ring" viewBox="0 0 628 628" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="314" cy="314" r="300" stroke="url(#paint0_linear)" strokeWidth="28" opacity="0.4" />
          <circle
            cx="314"
            cy="314"
            r="300"
            stroke="url(#paint0_linear)"
            strokeWidth="28"
            style={{
              strokeDashoffset: `${1884 + (-1884 * timer.time) / (totalTime !== 0 ? totalTime * 60 : 5 * 60)}px`,
              strokeDasharray: "1884px",
              ...progressRing.current,
            }}
          />
          <circle cx="314" cy="314" r="265" stroke="url(#paint1_linear)" strokeWidth="35" opacity="0.4" />
          <circle
            cx="314"
            cy="314"
            r="265"
            stroke="url(#paint1_linear)"
            strokeWidth="35"
            style={{ strokeDashoffset: `${1665 + (-1665 * timer.time) / 60}px`, strokeDasharray: "1665px", ...progressRing.current }}
          />
          <defs>
            <linearGradient id="paint0_linear" x1="281" y1="0" x2="281" y2="562" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="1" stopColor="#F94E83" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="281" y1="0" x2="281" y2="562" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="1" stopColor="orange" />
            </linearGradient>
          </defs>
        </svg>
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
          <h1 className="take-a-breakh1">Take a break in {formatTime(5 * 60 - timer.time)}</h1>
        )}
        {"Notification" in window && Notification.permission !== "granted" ? (
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
