import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.email, //this.state.email
                pass: this.pass //this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
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
            <div>
                {this.state.error && <div className="error">Oops!</div>}

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
                <button onClick={e => this.submit(e)}>login</button>
            </div>
        );
    }
}
