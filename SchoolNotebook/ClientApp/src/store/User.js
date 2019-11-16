// This is used to manage the state of the user session information

import setHttpAuthorizationToken from '../utils/setHttpAuthorizationToken';
import jwt_decode from 'jwt-decode';

const loginType = 'LOGIN';
const logoutType = 'LOGOUT';

const initialState = {
    isAuthenticated: false,
    email: '',
    name: '',
    picture: ''
};

export function loginActionCreator(token) {
    sessionStorage.setItem('jwtToken', token);
    setHttpAuthorizationToken(token);
    let jwtDecoded = jwt_decode(token);

    return {
        type: loginType,
        payload: {
            isAuthenticated: true,
            email: jwtDecoded.email,
            name: jwtDecoded.name,
            picture: jwtDecoded.picture
        }
    };
}

export function logoutActionCreator() {
    sessionStorage.removeItem('jwtToken');
    setHttpAuthorizationToken(false);

    return {
        type: logoutType,
        payload: {
            isAuthenticated: false,
            email: '',
            name: '',
            picture: ''
        }
    };
}

export const reducer = (state = initialState, action) => {
    if (action.type === loginType) {
        return action.payload;
    }
    else if (action.type === logoutType) {
        return action.payload;
    }

    return state;
};