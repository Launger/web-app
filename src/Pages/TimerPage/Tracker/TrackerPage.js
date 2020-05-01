import React, { useEffect, useState, useRef } from "react";
import { useStore } from "react-hookstore";
import { Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import NavBar from "../../../Components/NavBar/NavBar";
import Timer from "../../../Components/Timer/Timer";
import Points from "../../../Components/Points/Points";
import Todos from "../../../Components/Todos/Todos";

import widgetConfig from "../../../Components/Widgets/widgetConfig";
import { formatTime } from "../../../Helpers";

import "./TrackerPage.css";

const TrackerPage = ({ history }) => {
  const [timer, setTimer] = useStore("timer");
  const [sPoints, setSPoints] = useStore("sPoints");
  const [widget] = useStore("widget");

  const [workTimeLeft] = useState(
    Number(sessionStorage.getItem("workTimeLeft"))
  );

  const widgetId =
    widget.id ||
    JSON.parse(sessionStorage.getItem("widget")).id ||
    "d27154EFDbCa05654074E41a8d542b53"; //Classic
  const ppm = widgetConfig[widgetId].ppm || 60;

  const startTime = useRef(null);

  useEffect(() => {
    // console.log(workTimeLeft, timer);
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

      // if (newTime >= 25*60) {
      //   clearTimeout(ticker);
      //   notifyMe("Time's Up! Take a break now.");
      // if (!("Notification" in window) && Notification.permission === "denied")
      //   window.confirm("Time's Up! Take a break now.");
      //   document.title = `Work - ${formatTime(newTime)}`;
      //   setSPoints(sPoints + ppm / 60);
      //   return;
      // }

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
      sessionStorage.setItem("workTimeLeft", timer.time);
      document.title = "Launger";
    };

    return () => {
      clearTimeout(ticker);
      document.title = "Launger";
    };
  });

  return (
    <div className="TrackerPage">
      <NavBar Points={() => <Points ppm={ppm} />} />
      <div className="page-content">
        <Timer />
        <Todos />
        {timer.time >= 5 * 60 - 1 ? (
          <input
            className="take-a-break"
            type="button"
            value="Take a break"
            onClick={() => history.push("/break")}
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

export default withRouter(TrackerPage);

// const notifyMe = (message) => {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//     return;
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     new Notification(message);
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         new Notification(message);
//       }
//     });
//   }

//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them any more.
// }
