import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    //they are logged out
    elem = <Welcome />;
} else {
    //they are logged in
    elem = <img className="logoSmall" src="/images/logo.png" />;
}

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<App />, document.querySelector("main"));
//
// export default function HelloWorld() {
//     return (
//         <div>
//             <h1>Good morning :)</h1>
//             <p>ciaoooooooooo</p>
//         </div>
//     );
// }
