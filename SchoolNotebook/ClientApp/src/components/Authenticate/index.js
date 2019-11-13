// This component is used to check if the user is already authenticated, before it access the application

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

class Authenticate extends Component {
    render() {
        const component = this.props.isAuthenticated ? <div> {this.props.children}</div> : <Redirect to='/login' />;
        return (
            <div>
                {component}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
}


export default connect(mapStateToProps)(Authenticate);


