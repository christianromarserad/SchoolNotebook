import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginActionCreator } from '../../store/User';
import { Redirect } from 'react-router'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import config from '../../config.json';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.googleResponse = this.googleResponse.bind(this);
    }

    googleResponse = (response) => {
        let props = this.props;
        axios.post(config.GOOGLE_AUTH_CALLBACK_URL, { tokenId: response.tokenId }).then(function (res) {
            props.login(res.data.token);
        })
    };

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? <Redirect to='/' /> : null}
                <h1>Login Please</h1>
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Google Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.googleResponse}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login: loginActionCreator }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);