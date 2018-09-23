

export const SING_UP_BEGIN   = 'SING_UP_BEGIN';
export const SING_UP_SUCCESS = 'SING_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export default function SingUp(data) {
    return dispatch => {
        dispatch(signUpBegin());
        return fetch(`http://localhost:3001/sign-up`,{
            method: "POST",
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(signUpSuccess(json.ops[0]));
                return json
            })
            .catch(error => dispatch(signUpError(error)));
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const signUpBegin =() => ({
    type: SING_UP_BEGIN
});

export const signUpSuccess = (user) => {
    return {
        type: SING_UP_SUCCESS,
        payload: user
    }
};

export const signUpError = (error) => ({
    type: SIGN_UP_ERROR,
    payload: error
});