import React from "react";
import Registration from "./registration";
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this); instead of {this.submit} and binding , write function name below like this-> <button onClick={e=>this.submit()}>
    }
    render() {
        return (
            <div>
                <p>Welcome to </p>
                <p>our social network!</p>
                <p>
                    we are rebelling because all the other online communities
                    are revolting.
                </p>
                <p>Join the rebellion!</p>
                {this.state.error && <div className="error">Oops!</div>}
                <Registration />
                <p>
                    Already a member? <a href="/login">Log in</a>
                </p>
            </div>
        );
    }
}
