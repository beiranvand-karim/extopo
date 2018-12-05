export const FETCH_PERSON_BEGIN = 'FETCH_PEOPLE_BEGIN';
export const FETCH_PERSON_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PERSON_ERROR = 'FETCH_PEOPLE_ERROR';

export default function fetchPerson(token, id) {
   return dispatch => {
      dispatch(fetchPersonBegin());
      return fetch(`http://127.0.0.1:3002/people/${id}`, {
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
            dispatch(fetchPersonSuccess(json));
            return json
         })
         .catch(error => dispatch(fetchPersonError(error)));
   }
}

export function handleErrors(response) {
   if (!response.ok) {
      throw Error(response.statusText);
   }
   return response;
}

export const fetchPersonBegin = () => ({
   type: FETCH_PERSON_BEGIN
});

export const fetchPersonSuccess = (person) => {
   return {
      type: FETCH_PERSON_SUCCESS,
      payload: person
   }
};

export const fetchPersonError = (error) => ({
   type: FETCH_PERSON_ERROR,
   payload: error
});
