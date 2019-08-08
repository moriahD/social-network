import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postMessage, postMessages } from "./actions";
export default function WallPost(props) {
    const dispatch = useDispatch();
    // const postMessages = useSelector(state => state && state.msgs);
    const receiver_id = props.friendProfileId;
    const friendsposts = useSelector(state => state.wpmsgs);
    console.log("friendsposts: ", friendsposts);
    useEffect(() => {
        dispatch(postMessages());
    }, []);
    if (!friendsposts) {
        return null;
    }
    const keyCheck = e => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter was pressed!");
            dispatch(postMessage(receiver_id, e.target.value));

            e.target.value = "";
        }
    };

    return (
        <div className="wallpostBox">
            <p className="wallposttitle">
                Leave a message to {props.frienProfileFirstName}.
            </p>
            <textarea
                placeholder="leave your message here."
                onKeyDown={keyCheck}
            />

            <div className="wallpostlist">
                {friendsposts &&
                    friendsposts.map(wpmsg => (
                        <div key={wpmsg.id}>
                            <img src={wpmsg.image} />
                            <div className="wrapwallposts">
                                <p>
                                    {wpmsg.first_name} {wpmsg.last_name}
                                </p>
                                <p>{wpmsg.wpmessage}</p>
                                <span>{wpmsg.created_at}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
