// This file is used to remove or set the jwt token

import axios from 'axios';

function setHttpAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setHttpAuthorizationToken;