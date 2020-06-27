import { createStore } from "react-hookstore";
import { createSessionStore, createLocalStore } from "./Hooks";

// Default values
const 
  loggedInDefault = false,
  userDefault = { totalPoints: 0 },
  sPointsDefault = 0,
  widgetDefault = {id: "d27154EFDbCa05654074E41a8d542b53"}, // Classic widgetID
  timerDefault = { time: 0, isCountingdown: true },
  themeDefault = window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",
  togglePointsDefault = "real",
  todosDefault = [],
  timerModeDefault = "pomodoro",
  onBreakDefault = false,
  totalTimeDefault = 0;

// Create Tab Stores (Data is lost on tab refresh/close)
createStore("sPoints", sPointsDefault);
createStore("onBreak", onBreakDefault);
createStore("timer", timerDefault);
createStore("togglePoints", togglePointsDefault);
createStore("totalTime", totalTimeDefault);

// Create Session Stores (Data is lost on tab close)
createSessionStore("user", userDefault);
createSessionStore("widget", widgetDefault);
createSessionStore("nextWidget", widgetDefault);
createSessionStore("todos", todosDefault);
createSessionStore("timerMode", timerModeDefault);

// Create Local Stores (Data is NOT lost on tab close)
createLocalStore("loggedIn", loggedInDefault);
createLocalStore("theme", themeDefault, false);