import React from "react";
import Uploader from "./uploader";
import Profile from "./profilepic";
import axios from "./axios";
//use class when you need lifecycle...something?

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/user");
        console.log(data.user.rows[0]);
        this.setState(data.user);
    }
    render() {
        if (!this.state.image) {
            return <div>Loading...</div>;
        }
        return (
            <div className="profileWrap">
                <div className="navBox">
                    <img
                        className="logoSmall"
                        src="/images/logo.png"
                        alt="logo"
                    />
                    <p className="welcometxt">Welcome to blablabla</p>
                    <div className="profileWrap">
                        <Profile
                            image={this.state.image}
                            first={this.state.first_name}
                            last={this.state.last_name}
                            onClick={() =>
                                this.setState({ uploaderIsVisible: true })
                            } //it has to be arrow function for 'this' to stay within scope.
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader done={image => this.setState({ image })} />
                )}
            </div>
        );
    }
}

// {myArray.length && <Something/>}->is myArray is 0, it doesn't show anything, if its more than 0, it shows Something
