import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "./app.css";
import App from "./App";

var firebaseConfig = {
  apiKey: "AIzaSyDoNs5AADTZ-k5ikJ1AE27sX72Jg4Dui8k",
  authDomain: "tr0nlabs-6f56b.firebaseapp.com",
  databaseURL: "https://tr0nlabs-6f56b.firebaseio.com",
  projectId: "tr0nlabs-6f56b",
  storageBucket: "tr0nlabs-6f56b.appspot.com",
  messagingSenderId: "1056819810193",
  appId: "1:1056819810193:web:0a0637664d6b5f2f601430"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function IndexApp() {
  return <App />;
}
const rootElement = document.getElementById("root");
ReactDOM.render(<IndexApp />, rootElement);
