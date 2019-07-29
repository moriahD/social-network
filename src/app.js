import React from "react";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showBioEditor: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/user");
        console.log("data.user.rows[0]: ", data.user.rows[0]);
        console.log(this.state.bio);
        this.setState(data.user.rows[0]);
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

                    <div className="profileWrap">
                        <ProfilePic
                            image={this.state.image}
                            first={this.state.first_name}
                            last={this.state.last_name}
                            onClick={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                </div>
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={props => {
                                return (
                                    <Profile
                                        first={this.state.first_name}
                                        last={this.state.last_name}
                                        bio={this.state.bio}
                                        profilePic={
                                            <ProfilePic
                                                id={this.state.id}
                                                first={this.state.first_name}
                                                last={this.state.last_name}
                                                image={this.state.image}
                                                onClick={this.showUploader}
                                            />
                                        }
                                        bioEditor={
                                            <BioEditor
                                                onClick={() =>
                                                    this.setState({
                                                        showBioEditor: true
                                                    })
                                                }
                                                bio={this.state.bio}
                                                setBio={bio =>
                                                    this.setState({ bio: bio })
                                                }
                                            />
                                        }
                                    />
                                );
                            }}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        onClick={() =>
                            this.setState({
                                uploaderIsVisible: false
                            })
                        }
                        done={image => this.setState({ image })}
                    />
                )}
            </div>
        );
    }
}

// {myArray.length && <Something/>}->is myArray is 0, it doesn't show anything, if its more than 0, it shows Something
