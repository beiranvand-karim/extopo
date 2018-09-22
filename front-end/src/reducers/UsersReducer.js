import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR
} from '../actions/UserActions';

const initialState = {
    users: [],
    loading: false,
    error: null
};

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };

        case FETCH_USERS_ERROR:

            return {
                ...state,
                loading: false,
                error: action.payload,
                users: []
            };

        default:
            return state;
    }
}