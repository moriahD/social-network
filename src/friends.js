import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { friendslist, endFriendship, acceptFriendship } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const myfriends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );
    const wannabes = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
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
    const wannabesfriends = (
        <div>
            {wannabes &&
                wannabes.map(user => (
                    <div className="friendsbox" key="{user.id}">
                        <img src={user.image} />
                        <h1>
                            {user.first_name} {user.last_name}
                        </h1>
                        <button
                            onClick={e => dispatch(acceptFriendship(user.id))}
                        >
                            Accept Friendship
                        </button>
                    </div>
                ))}
        </div>
    );
    return (
        <div className="friendslist" style={{ padding: "70px 20px 20px 20px" }}>
            {!myfriends.length && <div>You have no friends!</div>}
            <p>These people are currently your friends</p>
            {!!myfriends.length && currentfriends}

            <p>These people want to be your friends</p>
            {!wannabes.length && (
                <div>You don&apos;t have any friendship request</div>
            )}
            {!!wannabes.length && wannabesfriends}
        </div>
    );
}
