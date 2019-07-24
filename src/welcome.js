import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this); instead of {this.submit} and binding , write function name below like this-> <button onClick={e=>this.submit()}>
    }
    render() {
        return (
            <HashRouter>
                <div className="registrationBox">
                    <p>Welcome to </p>
                    <p className="logotitle">sharing love</p>
                    <p>
                        we are rebelling because all the other online
                        communities are revolting.
                    </p>
                    <p>Join the rebellion!</p>
                    {this.state.error && <div className="error">Oops!</div>}

                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
