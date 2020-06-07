import React, { useState, lazy, Suspense } from "react";
import {withRouter} from "react-router-dom";
import {useStore} from "react-hookstore";
import {useSessionStore, useLocalStore} from "../../Utils/Hooks";

import ClockSpinner from "../../Components/ClockSpinner/ClockSpinner";

import {updateFiretoreWidgets, updateFireStorePoints} from "../../Helpers";

const ErrorModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./ErrorModal"));
const TryModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./TryModal"));
const GetModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./GetModal"));
const BothModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./BothModal"));

const TryGetModal = ({showTry, showGet, showBoth, onHide, tryCost, getCost, widgetId, name, ppm, history}) => {
  const [loggedIn] = useLocalStore("loggedIn");
  const [, setWidget] = useSessionStore("widget");
  const [user, setUser] = useSessionStore("user");
  const [sPoints, setSPoints] = useStore("sPoints");

  const [showError, setShowError] = useState(false);

  const handleUpdated = () => {
    sessionStorage.setItem("widget", JSON.stringify({id: widgetId}));
    setWidget({id: widgetId, ppm: ppm});
    history.push("/timer");
  }

  const handleTry = () => {
    onHide();
    if(!loggedIn) {
      setShowError("You are not logged in, please login to try this widget.");
    } else if((user.totalPoints + sPoints) < tryCost){
      setShowError("You do not have enough points.");
    } else {
      updateFireStorePoints(sPoints)
        .then((res) => {
          setUser({
            ...user,
            totalPoints: user.totalPoints + sPoints
          });
          setSPoints(0);
          return updateFiretoreWidgets(tryCost, widgetId, false)
        })
        .then(res2 => {
          setUser({
            ...user,
            widgets: [...user.widgets, widgetId],
            totalPoints: user.totalPoints - tryCost
          });
          setSPoints(0);
          handleUpdated();
        })
        .catch(err => {
          console.log(err);
          setShowError(err.message);
        });
    }
  }

  const handleGet = () => {
    onHide();
    if(!loggedIn) {
      setShowError("You are not logged in, please login to get this widget.");
    } else if((user.totalPoints + sPoints) < getCost){
      setShowError("You do not have enough points.")
    } else {
      updateFireStorePoints(sPoints)
        .then((res) => updateFiretoreWidgets(getCost, widgetId, true))
        .then(res2 => {
          setUser({
            ...user,
            widgets: [...user.widgets, widgetId],
            totalPoints: user.totalPoints + sPoints - getCost
          });
          setSPoints(0);
          handleUpdated();
        })
        .catch(err => {
          console.log(err);
          setShowError(err.message);
        });
    }
  }

  return (
    <div className="TryGetModal">
      <Suspense fallback={<ClockSpinner />}>
        <ErrorModal show={showError} onHide={() => setShowError(false)}/>
        <TryModal show={showTry} onHide={onHide} onClick={handleTry} name={name} tryCost={tryCost}/>
        <GetModal show={showGet} onHide={onHide} onClick={handleGet} name={name} getCost={getCost}/>
        <BothModal show={showBoth} onHide={onHide} onTry={handleTry} onGet={handleGet} name={name} tryCost={tryCost} getCost={getCost}/>
      </Suspense>
    </div>
  );
};

export default withRouter(TryGetModal);
