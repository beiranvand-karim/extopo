export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export function fetchUsers() {
   return dispatch => {
      dispatch(fetchUsersBegin());
      return fetch('https://jsonplaceholder.typicode.com/users')
         .then(handleErrors)
         .then(res => res.json())
         .then(json => {
            dispatch(fetchUsersSuccess(json));
            return json
         })
         .catch(error => dispatch(fetchUsersError(error)));
   }
}

function handleErrors(response) {
   if (!response.ok) {
      throw Error(response.statusText);
   }
   return response;
}

export const fetchUsersBegin = () => ({
   type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users) => {
   return {
      type: FETCH_USERS_SUCCESS,
      payload: users
   }
};

export const fetchUsersError = (error) => ({
   type: FETCH_USERS_ERROR,
   payload: error
});
