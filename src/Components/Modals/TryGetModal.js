import React, { useState, lazy, Suspense } from "react";
import {withRouter} from "react-router-dom";
import {useStore} from "react-hookstore";

import ClockSpinner from "../../Components/ClockSpinner/ClockSpinner";

import {updateFiretoreWidgets, updateFireStorePoints} from "../../Helpers";

const ErrorModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./ErrorModal"));
const TryModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./TryModal"));
const GetModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./GetModal"));
const BothModal = lazy(() => import( /* webpackChunkName: "[request]" */ "./BothModal"));

const TryGetModal = ({showTry, showGet, showBoth, onHide, tryCost, getCost, widgetId, name, ppm, history}) => {
  // eslint-disable-next-line
  const [, setWidget] = useStore("widget");
  const [user, setUser] = useStore("user");
  const [points, setPoints] = useStore("points");
  const { totalPoints } = points;
  const [sPoints, setSPoints] = useStore("sPoints");
  const [loggedIn] = useStore("loggedIn");
  const [showError, setShowError] = useState(false);

  const handleUpdated = () => {
    sessionStorage.setItem("widget", JSON.stringify({id: widgetId}));
    setWidget({id: widgetId, ppm: ppm});
    history.push("/timer");
  }

  const handleTry = () => {
    onHide();
    if(!loggedIn) {
      setShowError("You are not logged in, please log to try this widget.");
    } else if((points.totalPoints + sPoints) < tryCost){
      setShowError("You do not have enough points.");
    } else {
      updateFireStorePoints(sPoints)
        .then((res) => {
          // if (res !== undefined) console.log(res);
          setUser({
            ...user,
            totalPoints: totalPoints + sPoints
          });
          setPoints({
            totalPoints: totalPoints + sPoints
          });
          setSPoints(0);
          return updateFiretoreWidgets(tryCost, widgetId, false)
        })
        .then(res2 => {
          // console.log(res2);
          setUser({
            ...user,
            widgets: [...user.widgets, widgetId],
            totalPoints: totalPoints - tryCost
          });
          setPoints({
            totalPoints: totalPoints - tryCost
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
      setShowError("You are not logged in, please log in to get this widget.");
    } else if((points.totalPoints + sPoints) < getCost){
      setShowError("You do not have enough points.")
    } else {
    updateFireStorePoints(sPoints)
      .then((res) => {
        // if (res !== undefined) console.log(res);
        setUser({
          ...user,
          totalPoints: totalPoints + sPoints
        });
        setPoints({
          totalPoints: totalPoints + sPoints
        });
        setSPoints(0);
        return updateFiretoreWidgets(getCost, widgetId, true)
      })
      .then(res2 => {
        // console.log(res2);
        setUser({
          ...user,
          widgets: [...user.widgets, widgetId],
          totalPoints: totalPoints - getCost
        });
        setPoints({
          totalPoints: totalPoints - getCost
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
