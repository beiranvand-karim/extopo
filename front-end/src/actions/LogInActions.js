

export const CHECK_LOG_IN_BEGIN   = 'CHECK_LOG_IN_BEGIN';
export const CHECK_LOG_IN_SUCCESS = 'CHECK_LOG_IN_SUCCESS';
export const CHECK_LOG_IN_ERROR = 'CHECK_LOG_IN_ERROR';

export default function checkLogIn(userName, passWord) {
    return dispatch => {
        dispatch(checkLogInBegin());
        return fetch(`http://localhost:3001/log-in`,{
            method: "POST",
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userName: userName, passWord: passWord}),
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
        type: CHECK_LOG_IN_SUCCESS,
        payload: token
    }
};

export const checkLogInError = (error) => {
    return {
        type: CHECK_LOG_IN_ERROR,
        payload: error
    }
};