import setHttpAuthorizationToken from '../utils/setHttpAuthorizationToken';
import jwt_decode from 'jwt-decode';

const loginType = 'LOGIN';

const initialState = {
    isAuthenticated: false,
    name: ''
};

function loginActionCreator(token) {
    localStorage.setItem('jwtToken', token);
    setHttpAuthorizationToken(token);
    let jwtDecoded = jwt_decode(token);

    return { type: loginType, payload: { name: jwtDecoded.username, isAuthenticated: true } };
}

export const reducer = (state = initialState, action) => {
    if (action.type === loginType) {
        return action.payload;
    }

    return state;
};