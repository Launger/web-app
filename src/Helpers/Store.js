import { createStore } from "react-hookstore";

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

// Create Stores
createStore("loggedIn", (localStorage.getItem("loggedIn") === "true"? true : false) || loggedInDefault);
createStore("user", JSON.parse(sessionStorage.getItem("user")) || userDefault);
createStore("points", JSON.parse(sessionStorage.getItem("points")) || pointsDefault);
createStore("sPoints", sPointsDefault);
createStore("widget", JSON.parse(sessionStorage.getItem("widget")) || widgetDefault);
createStore("onBreak", false);
createStore("nextWidget", JSON.parse(sessionStorage.getItem("widget")) || widgetDefault);
createStore("timer", timerDefault);
createStore("theme", localStorage.getItem("theme") || themeDefault);
createStore("togglePoints", togglePointsDefault);
createStore("todos", JSON.parse(sessionStorage.getItem("todos")) || todosDefault);
createStore("timerMode", sessionStorage.getItem("timerMode") || timerModeDefault);
createStore("totalTime", 0);
