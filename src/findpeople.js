import React, { useState, useEffect } from "react";
import axios from "./axios";
export default function FindPeople() {
    const [users, setUsers] = useState();
    const [val, setVal] = useState();

    useEffect(() => {
        if (val == null) {
            (async () => {
                const list = await axios.get("/userslist.json");
                setUsers(list.data);
                console.log(list.data);
            })();
        }
    }, []);

    useEffect(
        () => {
            if (val !== undefined && val !== "") {
                (async () => {
                    const list = await axios.get(`/userslist/${val}.json`);
                    console.log(`"${val}" has been rendered!`);
                    setUsers(list.data);
                    console.log(list.data);
                })();
            }
        },
        [val]
    );
    return (
        <div className="findPeople" style={{ padding: "70px 20px 20px 20px" }}>
            {!val && (
                <p style={{ color: "#f5f5f5", fontSize: "20px" }}>
                    Recently joined people
                </p>
            )}
            <p style={{ color: "#f5f5f5", fontSize: "20px" }}>
                Are you looking for someone in particular?
            </p>
            <input
                type="text"
                onChange={e => setVal(e.target.value)}
                defaultValue={val}
                placeholder="Enter name "
            />
            {users &&
                users.map(user => (
                    <div key={user.id}>
                        <div
                            className="list"
                            style={{
                                width: "150px",
                                height: "150px",
                                overflow: "hidden"
                            }}
                        >
                            <img src={user.image} />
                        </div>
                        <h2>
                            {user.first_name} {user.last_name}
                        </h2>
                    </div>
                ))}
        </div>
    );
}
