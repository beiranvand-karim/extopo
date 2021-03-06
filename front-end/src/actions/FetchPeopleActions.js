export const FETCH_PEOPLE_BEGIN = 'FETCH_PEOPLE_BEGIN';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_ERROR = 'FETCH_PEOPLE_ERROR';

export default function fetchPeople(token) {
   return dispatch => {
      dispatch(fetchPeopleBegin());
      return fetch(`http://127.0.0.1:3002/people`, {
         method: "GET",
         headers: {
            "cache-control": "no-cache",
            "Content-Type": "application/json",
            "Authorization": "bearer " + token,
         }
      })
         .then(handleErrors)
         .then(res => res.json())
         .then(json => {
            dispatch(fetchPeopleSuccess(json));
            return json
         })
         .catch(error => dispatch(fetchPeopleError(error)));
   }
}

export function handleErrors(response) {
   if (!response.ok) {
      throw Error(response.statusText);
   }
   return response;
}

export const fetchPeopleBegin = () => ({
   type: FETCH_PEOPLE_BEGIN
});

export const fetchPeopleSuccess = (token) => {
   return {
      type: FETCH_PEOPLE_SUCCESS,
      payload: token
   }
};

export const fetchPeopleError = (error) => ({
   type: FETCH_PEOPLE_ERROR,
   payload: error
});
