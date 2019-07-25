import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Welcome from "./welcome";
import App from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";
let elem;
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname == "/welcome") {
    //they are logged out
    elem = <Welcome />;
} else {
    //they are logged in
    // elem = <img className="logoSmall" src="/images/logo.png" />;
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

//without this none will show on the browser
ReactDOM.render(elem, document.querySelector("main"));
