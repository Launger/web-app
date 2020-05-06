import React, { useEffect, useMemo, useState, Suspense, lazy, useRef } from "react";
import { useStore } from "react-hookstore";
import Toast from "react-bootstrap/Toast";

import NavBar from "../../Components/NavBar/NavBar";
import Timer from "../../Components/Timer/Timer";
import Points from "../../Components/Points/Points";
import ClockSpinner from "../../Components/ClockSpinner/ClockSpinner";
import Tips from "./Tips";

import { importWidget, importCards, filterIDs, formatTime, updatePoints, updateFireStorePoints } from "../../Helpers";
import config from "../../Helpers/RemoteConfig";
import wConfig from "../../Components/Widgets/widgetConfig";
import "./BreakPage.css";

const WarningModal = lazy(() => import( /* webpackChunkName: "[request]" */ "../../Components/Modals/WarningModal"));

const BreakPage = ({ history }) => {
  const [widget, setWidget] = useStore("widget");
  const [nextWidget] = useStore("nextWidget");
  const [, setOnBreak] = useStore("onBreak");
  const [timer, setTimer] = useStore("timer");
  const [sPoints, setSPoints] = useStore("sPoints");
  const [points, setPoints] = useStore("points");
  const [user] = useStore("user");
  const [timerMode] = useStore('timerMode');
  
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showUpNext, setShowUpNext] = useState(false);
  const [breakTime] = useState(Number(sessionStorage.getItem("breakTime") || 5*60));

  const startTime = useRef(null);

  // Fetch from widget store or sessionStorage
  const widgetId =
    widget.id ||
    JSON.parse(sessionStorage.getItem("widget")).id ||
    "d27154EFDbCa05654074E41a8d542b53"; //Classic

  useEffect(() => {
    setOnBreak(true);
    //Fetch when page reloads
    startTime.current = new Date();
    sessionStorage.removeItem('workTimeLeft');
    const isCountingdown = (JSON.parse(sessionStorage.getItem("isCountDown")) === null)
      ? true
      : Boolean(
        JSON.parse(sessionStorage.getItem("isCountDown"))
      );
    // sessionStorage.removeItem("widget");
    document.title = `Break - ${formatTime(breakTime)}`;
    setTimer({ time: breakTime, isCountingdown: isCountingdown });
    sessionStorage.removeItem("breakTime");
    sessionStorage.removeItem("isCountDown");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      let currentTime = new Date();
      let newTime = timer.isCountingdown ?
      breakTime - Math.floor((currentTime - startTime.current) / 1000) :
      breakTime + Math.floor((currentTime - startTime.current) / 1000);
      if(newTime <= 0 && timer.isCountingdown){
        setTimer({...timer, time: 0, isCountingdown: false});
      } else {
        if (newTime !== timer.time) {
          setTimer({...timer, time: newTime});
          document.title = `Break - ${formatTime(newTime)}`;
          updatePoints(sPoints, setSPoints, timer);
          if (timer.time % 60 === 0 && sPoints < 0) {
            updateFireStorePoints(sPoints)
              .then(res => {
                // if (res !== undefined) console.log(res);
                setPoints({totalPoints: points.totalPoints + sPoints});
                setSPoints(0);
                sessionStorage.setItem("points", JSON.stringify(points));
              }).catch(err => console.log(err));
          }
        } else {
          setTimer({...timer});
        }
      }
    }, 500);

    onbeforeunload = e => {
      sessionStorage.setItem("widget", JSON.stringify({id: widgetId}));
      sessionStorage.setItem("breakTime", timer.time);
      sessionStorage.setItem("isCountDown", timer.isCountingdown);
      document.title = "Launger"
    };

    return () => {
      clearTimeout(ticker);
    };
  });

  useEffect(() => {
    if(nextWidget.id !== widget.id) setShowUpNext(true);
    // eslint-disable-next-line
  }, [nextWidget])

  useEffect(() => {
    if (!timer.isCountingdown) {
      setShowWarningModal(true);
      notifyMe("Time's Up! Don't be lazy, get back to work.");
      document.title = "Time's up!";
      startTime.current = Date.now();
    }
  }, [timer.isCountingdown]);

  const handleFinish = () => {
    setTimer({...timer, isCountingdown: true});
    setOnBreak(false);
    setWidget(nextWidget);
    if (sPoints < 0) {
      updateFireStorePoints(sPoints)
        .then(res => {
          setPoints({totalPoints: points.totalPoints + sPoints});
          setSPoints(0);
          // if (res !== undefined) console.log(res);
          sessionStorage.setItem("points", JSON.stringify(points));
        })
        .catch(err => console.log(err));
    }
    history.push("/timer/" + timerMode);
  };

  const pointsToTake = (wConfig[widget.id].ppm*25) - (wConfig[nextWidget.id].ppm*25) > 0 ? (wConfig[nextWidget.id].ppm*25) - (wConfig[widget.id].ppm*25) : -50;

  const handlePlayNow = () => {
    setShowUpNext(false);
    if(pointsToTake < 0){
      setSPoints(sPoints + pointsToTake);
    }
    setWidget({id: nextWidget.id}); // automatically causes rerender
  }

  const classicIDs = [
    "d27154EFDbCa05654074E41a8d542b53", //Classic
    "Ee0Dff7436cD4009676a908cEfD6cd5C", //Trending
    "1d9fE1cfbEE45b15edba3fBd5b528F7B", //Random
    "Cbc849c7E7f700316F0fE317F1AbCe21"
  ];

  const [alreadyGotIDs, setAlreadyGotIDs] = useState([
    ...classicIDs,
    // ...(user?user.widgets:[]),
  ]);

  useEffect(() => {
    try {
      setAlreadyGotIDs([
        ...alreadyGotIDs,
        ...(user?user.widgets:[]),
      ]);
    }
    catch (err) {
      console.log(err);
      // alert("Please refresh page.")
    }
    // eslint-disable-next-line
  }, [user])

  const restIDs = JSON.parse(config.getValue("restIDs")._value);

  const importedWidget = useMemo(() => importWidget(widgetId), [widgetId]);
  // const renderPoints = useMemo(() => Points, []);
  const importedNextCard = useMemo(() => importCards([nextWidget.id], true), [nextWidget.id]);
  const importedAlreadyGotCards = useMemo(() => importCards(filterIDs([nextWidget.id], alreadyGotIDs), true), [alreadyGotIDs, nextWidget.id]);
  // eslint-disable-next-line
  const importedRestCards = useMemo(() => importCards(filterIDs([nextWidget.id], filterIDs(alreadyGotIDs, restIDs)), false), [alreadyGotIDs, nextWidget.id]);
  const renderTips = useMemo(() => <Tips />, []);

  return (
    <div className="BreakPage">
      <Suspense fallback={<ClockSpinner />}>
        <WarningModal 
          show={showWarningModal} 
          setShow={setShowWarningModal}
          handleFinish={handleFinish}
        />
      </Suspense>
      {nextWidget.name && <Toast show={showUpNext} onClose={() => setShowUpNext(false)} className="toast">
        <Toast.Header className="header">
          <strong className="mr-auto">Next: {nextWidget.name}</strong>
        </Toast.Header>
        <Toast.Body>
          {nextWidget.name} will play in the next session.
          <br/>
          <span onClick={handlePlayNow} className="playnow"><strong>Play now</strong> ({pointsToTake} Points)</span>
        </Toast.Body>
      </Toast>}
      
      <NavBar Timer={Timer} Points={Points} />
      <div className="page-content">
        <div className="grid-container">
          <div className="imported-widget">
            {importedWidget}
          </div>
          <div className="tips-n-tricks">
            {renderTips}
          </div>
          <aside className="sidebar">
            <div className="NEXT">
              NEXT: 
              {(nextWidget.id === widget.id) || <div onClick={handlePlayNow} className="playnow actionable"><strong>Play now</strong> ({pointsToTake} Points)</div>}
              <span onClick={handleFinish} className="backtowork actionable"><strong>Back to work</strong></span>
            </div>
            <div className="next-card cards">
              {importedNextCard}
            </div>
            <div className="alreadyGot-card cards">{importedAlreadyGotCards}</div>
            <div className="rest-card cards">{importedRestCards}</div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BreakPage;

const notifyMe = (message) => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
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
}