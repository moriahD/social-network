import React, { useState, useEffect } from "react";
import axios from "./axios";
export default function FriendButton(props) {
    const [button, setButton] = useState();
    const [val, setVal] = useState();
    const id = props.otherProfileId;
    const name = props.otherProfileName;
    console.log(name);

    useEffect(() => {
        (async () => {
            const buttonText = await axios.get(`/friendshipList/${id}.json`);
            setButton(buttonText.data.button);
            console.log("buttonText:", buttonText.data.button);
        })();
    }, []);

    return (
        <button onClick={e => setVal(e.target.value)} defaultValue={val}>
            {button} {name}
        </button>
    );
}
