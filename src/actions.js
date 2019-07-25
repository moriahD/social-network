import axios from "./axios";

export async function friendslist() {
    try {
        const { data } = await axios.get("/friends.json");
        console.log("data: ", data);
        return {
            type: "GET_ALL_FRIENDSLIST",
            users: data.rows
        };
    } catch (err) {
        console.log("err in get all friendslist", err);
    }
}

export async function endFriendship(id) {
    try {
        const { data } = await axios.post(`/friendshipList/${id}.json`, {
            button: "Unfriend"
        });

        return {
            type: "UNFRIEND",
            id
        };
    } catch (err) {
        console.log("err for endFriendship ", err);
    }
}
