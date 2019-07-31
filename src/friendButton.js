import React, { useState, useEffect } from "react";
import axios from "./axios";
export default function FriendButton(props) {
    const [users, setUsers] = useState();
    const [val, setVal] = useState();

    useEffect(() => {
        //
        //
    }, []);

    return (
        <button onClick={e => setVal(e.target.value)} defaultValue={val}>
            something
        </button>
    );
}
