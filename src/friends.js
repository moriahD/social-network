import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { friendslist, endFriendship } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const myfriends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );
    console.log("friends: ", myfriends);
    useEffect(() => {
        dispatch(friendslist());
    }, []);
    if (!myfriends) {
        return null;
    }
    const currentfriends = (
        <div>
            {myfriends &&
                myfriends.map(user => (
                    <div className="friendsbox" key="{user.id}">
                        <img src={user.image} />
                        <h1>
                            {user.first_name} {user.last_name}
                        </h1>
                        <button onClick={e => dispatch(endFriendship(user.id))}>
                            End Friendship
                        </button>
                    </div>
                ))}
        </div>
    );
    return (
        <div className="friendslist" style={{ padding: "70px 20px 20px 20px" }}>
            {!myfriends.length && <div>You have no friends!</div>}
            <h2>Friends List</h2>
            {!!myfriends.length && currentfriends}
        </div>
    );
}
//
//
// const wannabes = useSelector(
//     state => state.friends && state.friends.filter(i => i.accepted == false)
// );
// const friends = useSelector(
//     state => state.friends && state.friends.filter(i => i.accepted == true)
// );
