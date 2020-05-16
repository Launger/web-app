import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import { useStore } from "react-hookstore";

import ClockSpinner from "./Components/ClockSpinner/ClockSpinner";

import "./Helpers/Store";
import "./Helpers/Firebase";
import remoteConfig from "./Helpers/RemoteConfig";
// import "./Helpers/gapi";

const IndexPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/IndexPage/IndexPage"));
const BrowsePage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/BrowsePage/BrowsePage"));
const TimerPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/TimerPage/TimerPage"));
const BreakPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/BreakPage/BreakPage"));
const NotFound = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/NotFound/NotFound"));
const LoginPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/SignupPage/SignupPage"));
const PrivacyPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/PrivacyPage/PrivacyPage"));
const TermsPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/TermsPage/TermsPage"));
const CookiesPage = lazy(() => import( /* webpackChunkName: "[request]" */ "./Pages/CookiesPage/CookiesPage"));

function App() {
  const [, setLoggedIn] = useStore("loggedIn");
  const [user, setUser] = useStore("user");
  const [, setPoints] = useStore("points");
  const [theme] = useStore("theme");
  const [, setUpdate] = useState();

  const [themeStyle, setThemeStyle] = useState("");

  useEffect(() => {
    //Fetch from remote config
    remoteConfig.fetchAndActivate()
      .then(data => {
        document.head.querySelector("meta[property='og:title']").content = "Launger - " + remoteConfig.getString("welcomeText");
        document.head.querySelector("meta[name='description']").content = remoteConfig.getString("welcomeSubText");
        document.head.querySelector("meta[property='og:description']").content = remoteConfig.getString("welcomeSubText");
        setUpdate(data);
      })
      .catch(err => setUpdate(err));
    // Increment visits.
    let visits = localStorage.getItem('visits'); 
    localStorage.setItem('visits', visits !== null ? Number(visits) + 1 : 0);

    firebase.auth().onAuthStateChanged(fireUser => {
      // console.log("[DEV-ONLY] Auth info:", fireUser, "loggedIn:", loggedIn);
      if (fireUser) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        if (!user) {
          // console.log("[DEV-ONLY] User was NOT logged in before");
          firebase
            .firestore()
            .doc(`users/${fireUser.uid}/private/private`)
            .get()
            .then(doc => {
              const data = doc.data();
              // console.log("[DEV-ONLY] Firestore user:", data);
              const firePoints = {
                totalPoints: (data)?data.totalPoints : 0
              };
              sessionStorage.setItem("points", JSON.stringify(firePoints));
              setPoints(firePoints);
              sessionStorage.setItem("user", JSON.stringify({ ...data, ...firePoints}));
              setUser({ ...data, ...firePoints});
            });
        } else {
          // console.log("[DEV-ONLY] User was already logged in");
          // console.log("[DEV-ONLY] User info:", user, "Points info:", points);
        }
      } else {
        setLoggedIn(false);
        localStorage.setItem("loggedIn", false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (theme === "light") {
      setThemeStyle("");
    } else if (theme === "dark") {
      // eslint-disable-next-line
      setThemeStyle("\
        :root {\
          --primary-bg: #171717;\
          --secondary-bg: #373737;\
          --pns-mix-bg: #373737;\
          --primary-text-color: white;\
          --secondary-text-color: #dadadada;\
        }\
      ")
    }
  }, [theme])

  return (
    <div className="App">
      <style>{themeStyle}</style>
      <Suspense fallback={<ClockSpinner />} >
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/browse" component={BrowsePage} />
            <Route path="/timer/:mode" component={TimerPage} />
            <Route path="/break" component={BreakPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/cookies" component={CookiesPage} />
            <Route exact path="/djehuiroq8igbh8qpinurf839niueshf0239hfnudihr9pi23298fnr9wnu923ni98ewniuh9we" component={() => <h1>Created by Richard M. GUERRE</h1>} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
      {/* Temporary FIXME */}
      <a href="https://www.surveymonkey.com/r/8JNNY62" target="_blank" rel="noopener noreferrer" style={{padding: "1px 10px", position: "fixed", bottom: "0", right: "0", color: "white", borderRadius: "10px 0 0 0", border: "none", background: "linear-gradient(100deg, #ffae34 0%, #f95584 100%)"}}>Give Feedback</a>
    </div>
  );
}

export default App;
