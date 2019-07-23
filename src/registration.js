import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this); instead of {this.submit} and binding , write function name below like this-> <button onClick={e=>this.submit()}>
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({ [e.target.name]: e.target.value }); -->this is not neccessary because we don't have to render immidietly on this page
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/register", {
                first: this.first, //this.state.first ->if we set State above
                last: this.last, //this.state.last
                email: this.email, //this.state.email
                pass: this.pass //this.state.pass
            })
            .then(({ data }) => {
                if (data.loggedIn) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="registrationBox">
                {this.state.error && <div className="error">Oops!</div>}
                <input
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="First Name"
                />
                <input
                    name="last"
                    onChange={e => this.handleChange(e)}
                    placeholder="Last Name"
                />
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    placeholder="Email"
                />
                <input
                    name="pass"
                    type="password"
                    onChange={e => this.handleChange(e)}
                    placeholder="Password"
                />
                <button onClick={e => this.submit(e)}>register</button>
            </div>
        );
    }
}
