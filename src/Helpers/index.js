import React, { lazy, Suspense } from "react";
import firebase from "firebase/app";
import ClockSpinner from "../Components/ClockSpinner/ClockSpinner";

const filterIDs = (alreadyGotIDs, restIDs) => {
  return restIDs.filter(restID => {
    return !alreadyGotIDs.find(alreadyGotID => alreadyGotID === restID);
  });
};

const importCards = (widgetIDs, alreadyGot = false) => {
  return widgetIDs.map(widgetID => {
    // console.log("[DEV-ONLY] importing card", widgetID);
    const Card = lazy(() =>
      import(
        /* webpackChunkName: "[request]" */ `../Components/Widgets/${widgetID}/Card`
      )
    );
    return (
      <div key={widgetID} className="importedCard" style={{transition: "all 0.3s", position: "relative", height: "170px", width: "302px"}}>
        <Suspense fallback={<ClockSpinner />}>
          <Card alreadyGot={alreadyGot} />
        </Suspense>
      </div>
    );
  });
};

const importWidget = widgetID => {
  // console.log("[DEV-ONLY] Importing:", widgetID);
  const Widget = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */ `../Components/Widgets/${widgetID}/Widget`
    )
  );
  return (
    <Suspense fallback={<ClockSpinner />}>
      <Widget />
    </Suspense>
  );
};

const formatTime = (seconds) => {
  return (Math.floor(seconds / 60) >= 10
    ? Math.floor(seconds / 60)
    : "0" + Math.floor(seconds / 60)) +
  ":" +
  (Math.floor(seconds % 60) >= 10
    ? Math.floor(seconds % 60)
    : "0" + Math.floor(seconds % 60));
}

const updateTimer = (timer, setTimer) => {
  if (timer.isCountingdown) {
    if (timer.time - 1 < 0) setTimer({ ...timer, isCountingdown: false });
    else setTimer({ ...timer, time: timer.time - 1 });
  } else {
    setTimer({ ...timer, time: timer.time + 1 });
  }
};

const updatePoints = (points, setPoints, timer) => {
  if (!timer.isCountingdown && timer.time > 0) {
    if (timer.time % 30 === 0) setPoints(points - 100);
    else if (timer.time % 10 === 0) setPoints(points - 10);
  }
};

const updateTimerPoints = (timer, setTimer, points, setPoints) => {
  updateTimer(timer, setTimer);
  updatePoints(points, setPoints, timer);
};

const updateFireStorePoints = (sPoints) => {
  return new Promise((resolve, reject) => {
    if (sPoints === 0) resolve("No points to add.");
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    if (user !== null && user !== undefined) {
      const uid = user.uid;
      const userRef = db.doc(`users/${uid}/private/private`)
      
      // TODO: calculateNumberOfDayStreak
      userRef.update({
        totalPoints: firebase.firestore.FieldValue.increment(sPoints),
        lastTransaction: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((res) => resolve(res))
      .catch(err => reject(err));
    } else reject("User not logged in.");
  })
}

const updateFiretoreWidgets = (amount, widgetId, isGetting) => {
  const db = firebase.firestore(),
    uid = firebase.auth().currentUser && firebase.auth().currentUser.uid;

  if (uid !== null && uid !== undefined) {
    const userRef = db.doc(`users/${uid}/private/private`);
    return db.runTransaction(transaction => {
      return transaction.get(userRef).then(userDoc => {
        if (!userDoc.exists) {
          throw new Error("Your user document was not created, please sign up again.");
        }
        const data = userDoc.data();
        if(data.totalPoints < amount) {
          throw new Error("You do not have enough points to complete this transaction!");
        } else {
          const updates = {
            totalPoints: data.totalPoints - amount,
            widgets: [
              ...data.widgets,
              ...(isGetting?[widgetId]:[]),
            ],
          }
          transaction.update(userRef, updates);
          sessionStorage.setItem("points", JSON.stringify({
            totalPoints: data.totalPoints - amount
          }));
          const userData = JSON.parse(sessionStorage.getItem("user"));
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...userData,
              totalPoints: data.totalPoints - amount,
              widgets: [
                ...data.widgets,
                widgetId,
              ],
            })
          );
        }
      });
    });
  } else {
    return Promise.reject({message: "You are not logged in, please log in to use this widget."});
  }
}

export {
  updateFiretoreWidgets,
  updateFireStorePoints,
  filterIDs,
  importCards,
  importWidget,
  updatePoints,
  updateTimer,
  updateTimerPoints,
  formatTime
};
