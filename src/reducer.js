export default function(state = {}, action) {
    if (action.type == "GET_ALL_FRIENDSLIST") {
        state = {
            ...state,
            users: action.users
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    users: null
                };
            })
        };
    } else if (action.type == "ACCEPT") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    accepted: true
                };
            })
        };
    } else if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            msgs: action.msgs
        };
    } else if (action.type == "CHAT_MESSAGE") {
        state = {
            ...state,
            msg: action.msg
        };
    }
    return state;
}
