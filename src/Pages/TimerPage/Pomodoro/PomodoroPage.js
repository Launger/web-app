import React, { useEffect, useState, useRef } from "react";
import { useStore } from "react-hookstore";
import { useSessionStore } from "Utils/Hooks";
import { Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import NavBar from "Components/NavBar/NavBar";
import Timer from "Components/Timer/Timer";
import Points from "Components/Points/Points";
import Todos from "Components/Todos/Todos";

import widgetConfig from "Components/Widgets/widgetConfig";
import { formatTime, updateFireStorePoints } from "Utils";

import "./PomodoroPage.css";
const TIME = 25 * 60;

const TimePage = ({ history }) => {
  const [user, setUser] = useSessionStore("user");
  const [widget] = useSessionStore("widget");
  const [timer, setTimer] = useStore("timer");
  const [sPoints, setSPoints] = useStore("sPoints");

  const [workTimeLeft, setWorkTimeLeft] = useState(Number(sessionStorage.getItem("workTimeLeft") || TIME));
  //FIXME : Temporary
  const progressRing = useRef({});

  const widgetId = widget.id || JSON.parse(sessionStorage.getItem("widget")).id || "d27154EFDbCa05654074E41a8d542b53"; //Classic
  const ppm = widgetConfig[widgetId].ppm || 60;

  const startTime = useRef(null);

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
      let newTime = workTimeLeft - Math.floor((currentTime - startTime.current) / 1000);

      if (newTime <= 0) {
        clearTimeout(ticker);
        notifyMe("Time's Up! Take a break now.");
        if (!("Notification" in window) && Notification.permission === "denied") window.confirm("Time's Up! Take a break now.");
        document.title = `Work - ${formatTime(newTime)}`;
        setSPoints(sPoints + ppm / 60);
        handleFinish();
        return;
      }

      if (newTime !== timer.time) {
        setTimer({ ...timer, time: newTime });
        document.title = `Work - ${formatTime(newTime)}`;
        setSPoints(sPoints + (ppm * (timer.time - newTime)) / 60);
      } else {
        setTimer({ ...timer });
      }
    }, 500);

    onbeforeunload = e => {
      sessionStorage.setItem("widget", JSON.stringify({ id: widgetId }));
      sessionStorage.setItem("workTimeLeft", timer.time);
      document.title = "Launger";
    };

    return () => {
      clearTimeout(ticker);
    };
  });

  const addMinute = () => {
    setWorkTimeLeft(workTimeLeft + 60);
    setSPoints(sPoints + ppm);
  };

  const handleFinish = () => {
    sessionStorage.removeItem("workTimeLeft");
    updateFireStorePoints(sPoints + ppm / 60)
      .then(res => {
        setUser({ ...user, totalPoints: user.totalPoints + sPoints + ppm / 60 });
        setSPoints(0);
      })
      .catch(err => console.log(err));
    history.push("/break");
  };

  return (
    <div className="PomodoroPage">
      <NavBar Points={() => <Points ppm={ppm} />} />
      <div className="page-content">
        <Timer />
        <svg className="progress-ring" viewBox="0 0 628 628" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="314" cy="314" r="300" stroke="url(#paint0_linear)" strokeWidth="28" opacity="0.4" />
          <circle
            cx="314"
            cy="314"
            r="300"
            stroke="url(#paint0_linear)"
            strokeWidth="28"
            style={{ strokeDashoffset: `${-1884 + (1884 * timer.time) / TIME}px`, strokeDasharray: "1884px", ...progressRing.current }}
          />
          <circle cx="314" cy="314" r="265" stroke="url(#paint1_linear)" strokeWidth="35" opacity="0.4" />
          <circle
            cx="314"
            cy="314"
            r="265"
            stroke="url(#paint1_linear)"
            strokeWidth="35"
            style={{ strokeDashoffset: `${1665 + -1665 * ((TIME - timer.time) / 60)}px`, strokeDasharray: "1665px", ...progressRing.current }}
          />
          <defs>
            <linearGradient id="paint0_linear" x1="281" y1="0" x2="281" y2="562" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F94E83" />
              <stop offset="1" stopColor="#FF0000" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="281" y1="0" x2="281" y2="562" gradientUnits="userSpaceOnUse">
              <stop stopColor="orange" />
              <stop offset="1" stopColor="#FF0000" />
            </linearGradient>
          </defs>
        </svg>
        <Todos />
        {timer.time <= 60 + 1 && (
          <input className="add-a-minute" type="button" value="Add a minute" onClick={addMinute} style={timer.time <= 60 ? { opacity: "1" } : {}} />
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

export default withRouter(TimePage);

const notifyMe = message => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
};
