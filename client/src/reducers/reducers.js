import {
    SET_PR_INFORMATION,
} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PR_INFORMATION:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;
    }
}