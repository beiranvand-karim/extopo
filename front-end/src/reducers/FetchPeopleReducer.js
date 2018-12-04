import {
   FETCH_PEOPLE_BEGIN,
   FETCH_PEOPLE_SUCCESS,
   FETCH_PEOPLE_ERROR
} from '../actions/FetchPeopleActions';

const initialState = {
   people: null,
   loading: false,
   error: null
};

export default function FetchPeopleReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_PEOPLE_BEGIN:
         return {
            ...state,
            loading: true,
            error: null
         };

      case FETCH_PEOPLE_SUCCESS:
         return {
            ...state,
            loading: false,
            people: action.payload
         };

      case FETCH_PEOPLE_ERROR:

         return {
            ...state,
            loading: false,
            error: action.payload,
            people: null
         };

      default:
         return state;
   }
}
