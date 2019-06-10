import setHttpAuthorizationToken from '../utils/setHttpAuthorizationToken';
import jwt_decode from 'jwt-decode';

const loginType = 'LOGIN';
const logoutType = 'LOGOUT';

const initialState = {
    isAuthenticated: false,
    email: '',
    givenName: '',
    familyName: ''
};

export function loginActionCreator(token) {
    localStorage.setItem('jwtToken', token);
    setHttpAuthorizationToken(token);
    let jwtDecoded = jwt_decode(token);

    return {
        type: loginType,
        payload: {
            isAuthenticated: true,
            email: jwtDecoded.email,
            givenName: jwtDecoded.givenName,
            familyName: jwtDecoded.familyName
        }
    };
}

export function logoutActionCreator() {
    localStorage.removeItem('jwtToken');
    setHttpAuthorizationToken(false);

    return {
        type: logoutType,
        payload: {
            isAuthenticated: false,
            email: '',
            givenName: '',
            familyName: ''
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