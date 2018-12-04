import {
   FETCH_PERSON_BEGIN,
   FETCH_PERSON_SUCCESS,
   FETCH_PERSON_ERROR
} from '../actions/FetchPersonDetailActions';

const initialState = {
   person: null,
   loading: false,
   error: null
};

export default function PersonDetailReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_PERSON_BEGIN:
         return {
            ...state,
            loading: true,
            error: null
         };

      case FETCH_PERSON_SUCCESS:
         return {
            ...state,
            loading: false,
            person: action.payload
         };

      case FETCH_PERSON_ERROR:

         return {
            ...state,
            loading: false,
            error: action.payload,
            person: null
         };

      default:
         return state;
   }
}
