import {
   CHECK_LOG_IN_BEGIN,
   CHECK_LOG_IN_SUCCESS,
   CHECK_LOG_IN_ERROR
} from '../actions/LogInActions';

const initialState = {
   token: null,
   loading: false,
   error: null,
   loggedIn: false
};

export default function LogInReducer(state = initialState, action) {
   switch (action.type) {
      case CHECK_LOG_IN_BEGIN:
         return {
            ...state,
            loading: true,
            error: null
         };

      case CHECK_LOG_IN_SUCCESS:
         return {
            ...state,
            loading: false,
            token: action.payload,
            loggedIn: true
         };

      case CHECK_LOG_IN_ERROR:

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
