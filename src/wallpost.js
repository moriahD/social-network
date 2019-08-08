import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WallPost() {
    // const postMessages = useSelector(state => state && state.msgs);
    const keyCheck = e => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter was pressed!");
            // socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="wallpostBox">
            <p className="wallposttitle">
                Leave a message to "your friend name".
            </p>
            <textarea
                placeholder="leave your message here."
                onKeyDown={keyCheck}
            />
            <div className="wallpostlist">
                <img src="" />
                <div className="wrapwallposts">
                    <p>first name and last name with link</p>
                    <p>friends message here blablabla.</p>
                    <span>date</span>
                </div>
            </div>
        </div>
    );
}
