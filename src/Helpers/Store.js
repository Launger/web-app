import { createStore } from "react-hookstore";
import { createSessionStore, createLocalStore } from "../Utils/Hooks";

// Default values
const 
  loggedInDefault = false,
  userDefault = null,
  pointsDefault = { totalPoints: 0 },
  sPointsDefault = 0,
  widgetDefault = {id: "d27154EFDbCa05654074E41a8d542b53", ppm: 60}, // Classic widgetID
  timerDefault = { time: 0, isCountingdown: true },
  themeDefault = window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",
  togglePointsDefault = "real",
  todosDefault = [],
  timerModeDefault = "pomodoro"

// Create Tab Stores (Data is lost on tab refresh/close)
createStore("sPoints", sPointsDefault);
createStore("onBreak", false);
createStore("timer", timerDefault);
createStore("togglePoints", togglePointsDefault);
createStore("totalTime", 0);

// Create Session Stores (Data is lost on tab close)
createSessionStore("user", userDefault);
createSessionStore("points", pointsDefault);
createSessionStore("widget", widgetDefault);
createSessionStore("nextWidget", widgetDefault);
createSessionStore("todos", todosDefault);
createSessionStore("timerMode", timerModeDefault);

// Create Local Stores (Data is NOT lost on tab close)
createLocalStore("loggedIn", loggedInDefault);
createStore("theme", localStorage.getItem("theme") || themeDefault);