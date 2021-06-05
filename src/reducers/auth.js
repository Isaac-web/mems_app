import {AUTH, LOGOUT} from '../constants/actionContants';

const authReducer = (state={authData: null}, action) => {
    switch(action.type) {
        case AUTH:
            const user = {profile: action.data.user, token: action.data.token};
            localStorage.setItem("profile", JSON.stringify(user));

            return ({...state, authData: user});

        case LOGOUT:
            localStorage.clear();
            return ({...state, authData: null});
        default:
            return state;
    }
}

export default authReducer;