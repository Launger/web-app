import * as app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/functions";

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

app.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
});

app.analytics();