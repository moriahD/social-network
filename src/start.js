import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Welcome from "./welcome";
import App from "./app";

let elem;

if (location.pathname == "/welcome") {
    //they are logged out
    elem = <Welcome />;
} else {
    //they are logged in
    // elem = <img className="logoSmall" src="/images/logo.png" />;
    elem = <App />;
}

//without this none will show on the browser
ReactDOM.render(elem, document.querySelector("main"));
