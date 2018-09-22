
export const FETCH_SINGLE_USER_BEGIN   = 'FETCH_SINGLE_USER_BEGIN';
export const FETCH_SINGLE_USER_SUCCESS = 'FETCH_SINGLE_USER_SUCCESS';
export const FETCH_SINGLE_USER_ERROR = 'FETCH_SINGLE_USER_ERROR';

export function fetchSingleUser(id) {
    return dispatch => {
        dispatch(fetchSingleUserBegin());
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchSingleUserSuccess(json));
                return json
            })
            .catch(error => dispatch(fetchSingleUserError(error)));
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const fetchSingleUserBegin =() => ({
    type: FETCH_SINGLE_USER_BEGIN
});

export const fetchSingleUserSuccess = (user) => {
    return {
        type: FETCH_SINGLE_USER_SUCCESS,
        payload: user
    }
};

export const fetchSingleUserError = (error) => ({
    type: FETCH_SINGLE_USER_ERROR,
    payload: error
});