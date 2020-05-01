import React, { useState, lazy, Suspense } from "react";
import { withRouter } from "react-router-dom";
import { useStore } from "react-hookstore";

import ClockSpinner from "../../../ClockSpinner/ClockSpinner";

import config from "../../widgetConfig";
import "./Card.css";

const TryGetModal = lazy(() => import( /* webpackChunkName: "[request]" */ "../../../Modals/TryGetModal"));
const LoginSignUpModal = lazy(() => import( /* webpackChunkName: "[request]" */ "../../../Modals/LoginSignUpModal/LoginSignUpModal"));

const CardTemplate = ({ id, thumbnails, changePPM, alreadyGot, history }) => {
  const [, setWidget] = useStore("widget");
  const [, setNextWidget] = useStore("nextWidget");
  const [onBreak] = useStore("onBreak");
  const [loggedIn] = useStore("loggedIn");
  const [timerMode] = useStore("timerMode");

  const 
    [hoverStyle, setHoverStyle] = useState({}),
    [getBtn, setGetBtn] = useState({}),
    [tryBtn, setTryBtn] = useState({}),
    [fgStyle, setFgStyle] = useState({}),
    [isHovered, setIsHovered] = useState(false),
    [showTryModal, setShowTryModal] = useState(false),
    [showGetModal, setShowGetModal] = useState(false),
    [showBothModal, setShowBothModal] = useState(false),
    [showLoginModal, setShowLoginModal] = useState(false);


  const
    tryCost = config[id].tryCost,
    ppm = changePPM || config[id].ppm,
    getCost = config[id].getCost,
    name = config[id].name || "Classic";

  const handleClick = () => {
    if (!alreadyGot) {
      if(!loggedIn) setShowLoginModal(true);
      else setShowBothModal(true);
    } else if (onBreak) {
      sessionStorage.setItem("widget", JSON.stringify({ id: id }));
      setNextWidget({ name: name, id: id });
    } else {
      sessionStorage.setItem("widget", JSON.stringify({ id: id }));
      setWidget({ id: id, ppm: ppm });
      history.push("/timer/"+timerMode);
    }
  };

  const handleWidgetHover = () => {
    setIsHovered(true);
    setTimeout(() => {
      setFgStyle({
        opacity: "1",
      });
    }, 300)
    setHoverStyle({
      opacity: "1",
      transform: "translateY(-20px)",
      marginBottom: "-60px"
    });
  };

  const handleTryHover = () => {
    // console.log("TRY button hovered");
    setTryBtn({
      display: "flex",
      opacity: "1",
      transform: "translate(0, -61px)"
    });
  };

  const handleTryClick = () => {
    if(!loggedIn) setShowLoginModal(true);
    else setShowTryModal(true);
  }

  const handleGetHover = () => {
    // console.log("GET button hovered");
    setGetBtn({
      display: "flex",
      opacity: "1",
      transform: "translate(0px, -61px)"
    });
  };

  const handleGetClick = () => {
    if(!loggedIn) setShowLoginModal(true);
    else setShowGetModal(true);
  }

  const handleHideModal = () => {
    setShowGetModal(false);
    setShowTryModal(false);
    setShowBothModal(false);
  };

  const defaultThumbnailBg = (
    <>
      <div className="default-card-bg">
        <div className="text">
          <div className="name" style={(name.length > 12)?{fontSize: "2.5em"}:{}}>{name}</div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Suspense fallback={<ClockSpinner />}>
        <TryGetModal
          showTry={showTryModal}
          showGet={showGetModal}
          showBoth={showBothModal}
          onHide={handleHideModal}
          tryCost={tryCost}
          getCost={getCost}
          widgetId={id}
          name={name}
          ppm={ppm}
        />
        <LoginSignUpModal show={showLoginModal} onHide={() => setShowLoginModal(false)}/>
      </Suspense>
      <div
        className="CardTemplate actionable"
        onMouseEnter={handleWidgetHover}
        onMouseLeave={() => {
          setFgStyle({});
          setTimeout(() => {
            setIsHovered(false);
          }, 300);
          setHoverStyle({});
        }}
      >
        <div className="content-illustration" onClick={handleClick}>
          {defaultThumbnailBg}
          {thumbnails.bg}
          <div className="card-fg" style={fgStyle}>
            {(isHovered)?thumbnails.fg:<></>}
          </div>
        </div>
        <div className="stats" style={hoverStyle}>
          {!alreadyGot && (
            <div
              className="TRY stat"
              onClick={handleTryClick}
              onMouseEnter={handleTryHover}
              onMouseLeave={() => setTryBtn({})}
            >
              <h3>{tryCost}</h3>
              <h4>TRY</h4>
              <div className="try-btn" style={tryBtn}>
                <h3>TRY</h3>
              </div>
            </div>
          )}
          <div className="PPM stat" onClick={handleClick}>
            <h3>{ppm}</h3>
            <h4>PPM</h4>
          </div>
          {!alreadyGot && (
            <div
              className="COST stat"
              onClick={handleGetClick}
              onMouseEnter={handleGetHover}
              onMouseLeave={() => setGetBtn({})}
            >
              <h3>{getCost}</h3>
              <h4>GET</h4>
              <div className="get-btn" style={getBtn}>
                <h3>GET</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(CardTemplate);
