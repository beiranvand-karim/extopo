import {
    CHECK_LOG_IN_BEGIN,
    CHECK_LOG_IN_BEGIN_SUCCESS,
    CHECK_LOG_IN_BEGIN_ERROR
} from '../actions/LogInActions';

const initialState = {
    token: null,
    loading: false,
    error: null
};

export default function LogInReducer(state = initialState, action) {
    switch(action.type) {
        case CHECK_LOG_IN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CHECK_LOG_IN_BEGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload
            };

        case CHECK_LOG_IN_BEGIN_ERROR:

            return {
                ...state,
                loading: false,
                error: action.payload,
                token: null
            };

        default:
            return state;
    }
}