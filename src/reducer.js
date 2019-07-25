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
    }
    return state;
}
