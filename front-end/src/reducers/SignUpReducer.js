import {
   SING_UP_BEGIN,
   SING_UP_SUCCESS,
   SIGN_UP_ERROR
} from '../actions/SignUpActions';

const initialState = {
   user: null,
   loading: false,
   error: null
};

export default function SignUpReducer(state = initialState, action) {
   switch (action.type) {
      case SING_UP_BEGIN:
         return {
            ...state,
            loading: true,
            error: null
         };

      case SING_UP_SUCCESS:
         return {
            ...state,
            loading: false,
            user: action.payload
         };

      case SIGN_UP_ERROR:

         return {
            ...state,
            loading: false,
            error: action.payload
         };

      default:
         return state;
   }
}
