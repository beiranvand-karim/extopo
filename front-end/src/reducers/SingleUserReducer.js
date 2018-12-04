import {
   FETCH_SINGLE_USER_BEGIN,
   FETCH_SINGLE_USER_SUCCESS,
   FETCH_SINGLE_USER_ERROR
} from '../actions/SingleUserActions';

const initialState = {
   user: null,
   loading: false,
   error: null
};

export default function SingleUserReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_SINGLE_USER_BEGIN:
         return {
            ...state,
            loading: true,
            error: null
         };

      case FETCH_SINGLE_USER_SUCCESS:
         return {
            ...state,
            loading: false,
            user: action.payload
         };

      case FETCH_SINGLE_USER_ERROR:

         return {
            ...state,
            loading: false,
            error: action.payload,
            user: null
         };

      default:
         return state;
   }
}
