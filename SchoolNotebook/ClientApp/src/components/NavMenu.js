import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutActionCreator } from '../store/User'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavMenu extends React.Component {

  render () {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h6" color="inherit">
                    News
                </Typography>
                <Typography style={{ flexGrow: 1 }} variant="h6" color="inherit">
                    { this.props.name }
                </Typography>
                <Button color="inherit" onClick={ this.props.logout }>Logout</Button>
            </Toolbar>
        </AppBar>
    );
  }
}

function mapStateToProps(state) {
    return {
        name: state.user.givenName + ' ' + state.user.familyName
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout: logoutActionCreator }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
