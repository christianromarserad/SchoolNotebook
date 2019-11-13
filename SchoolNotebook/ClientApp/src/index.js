// This is the index root file

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { loginActionCreator, logoutActionCreator } from './store/User';
import 'typeface-roboto';
import 'draft-js/dist/Draft.css';
import './styles.css';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status == 401) {
        store.dispatch(logoutActionCreator());
    }

    return Promise.reject(error);
});

if (localStorage.jwtToken) {
    store.dispatch(loginActionCreator(localStorage.jwtToken));
}

ReactDOM.render(
    <div>
        <CssBaseline />
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </div>,
  rootElement);

registerServiceWorker();
