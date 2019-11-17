// This component is used to render the log in page

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
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
        margin: '40px 0px 100px 0px',
        fontFamily: 'Brush Script MT'
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
        this.googleSuccessResponse = this.googleSuccessResponse.bind(this);
        this.googleFailureResponse = this.googleFailureResponse.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

        this.state = {
            isLoading: false,
            isSnackbarOpen: false
        }
    }

    closeSnackBar = () => {
        this.setState({ isLoading: false, isSnackbarOpen: false })
    }

    googleSuccessResponse = (response) => {
        let props = this.props;
        this.setState({ isLoading: true, isSnackbarOpen: false })
        axios.post(config.GOOGLE_AUTH_CALLBACK_URL, { tokenId: response.tokenId }).then(function (res) {
            props.login(res.data.token);
        }).catch(error => {
            this.setState({ isLoading: false, isSnackbarOpen: true})
        });
    };

    googleFailureResponse = (response) => {
        this.setState({ isLoading: false, isSnackbarOpen: true })
    };

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.isSnackbarOpen}
                    onClose={this.closeSnackBar}
                    autoHideDuration={2000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Login Failed</span>}
                />

                <Typography variant="h1" gutterBottom className={this.props.classes.title}>
                    School Notebook
                </Typography>
                <Paper className={this.props.classes.card}>
                    {this.props.isAuthenticated ? <Redirect to='/' /> : null}
                    <Typography variant="h5" gutterBottom className={this.props.classes.cardTitle}>
                        {
                            this.state.isLoading ?
                                <span>Logging in</span> :
                                <span>Please Login</span>
                        }
                    </Typography>
                    {
                        this.state.isLoading ?
                            <CircularProgress /> :
                            <GoogleLogin
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Login with Google"
                                onSuccess={this.googleSuccessResponse}
                                onFailure={this.googleFailureResponse}
                            />
                    }
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