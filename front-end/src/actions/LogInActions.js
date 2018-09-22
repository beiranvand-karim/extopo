

export const CHECK_LOG_IN_BEGIN   = 'CHECK_LOG_IN_BEGIN';
export const CHECK_LOG_IN_BEGIN_SUCCESS = 'CHECK_LOG_IN_BEGIN_SUCCESS';
export const CHECK_LOG_IN_BEGIN_ERROR = 'CHECK_LOG_IN_BEGIN_ERROR';

export default function checkLogIn(userName, passWord) {
    return dispatch => {
        dispatch(checkLogInBegin());
        return fetch(`http://localhost:3001/auth`,{
            method: "POST",
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: userName, password: passWord}),
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(checkLogInSuccess(json.token));
                return json
            })
            .catch(error => dispatch(checkLogInError(error)));
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const checkLogInBegin =() => ({
    type: CHECK_LOG_IN_BEGIN
});

export const checkLogInSuccess = (token) => {
    return {
        type: CHECK_LOG_IN_BEGIN_SUCCESS,
        payload: token
    }
};

export const checkLogInError = (error) => ({
    type: CHECK_LOG_IN_BEGIN_ERROR,
    payload: error
});