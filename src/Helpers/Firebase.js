import * as app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

app.initializeApp({  
  apiKey: "AIzaSyBIHQZmwFHF2DiiYc1WfUIRh0sYTKuN9Sk",
  authDomain: "time-25.firebaseapp.com",
  databaseURL: "https://time-25.firebaseio.com",
  projectId: "time-25",
  storageBucket: "time-25.appspot.com",
  messagingSenderId: "87335843117",
  appId: "1:87335843117:web:bc8fae2f19162800ca4fa4",
  measurementId: "G-E7NKFWME5Z"
});

app.analytics();