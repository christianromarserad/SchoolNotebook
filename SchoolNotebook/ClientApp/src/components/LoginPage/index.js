import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginActionCreator } from '../../store/User';
import { Redirect } from 'react-router'
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import config from '../../config.json';

const styles = {
    title: {
        textAlign: 'center',
        margin: '40px 0px 100px 0px'
    },
    card: {
        height: '300px',
        width: '400px',
        textAlign: 'center',
        margin: '0px auto 0px auto',
        padding: '20px'
    },
    cardTitle: {
        marginBottom: '70px'
    }
};

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
                <Typography variant="h2" gutterBottom className={this.props.classes.title}>
                    School Notebook
                </Typography>
                <Paper className={this.props.classes.card}>
                    {this.props.isAuthenticated ? <Redirect to='/' /> : null}
                    <Typography variant="h5" gutterBottom className={this.props.classes.cardTitle}>
                        Please Login
                    </Typography>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Google Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </Paper>
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


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginPage));