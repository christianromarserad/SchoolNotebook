import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class NavMenu extends React.Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={{ flexGrow: 1 }} variant="h6" color="inherit">
                    News
                </Typography>
                <Button style={{ flexGrow: 1 }} color="inherit" component={Link} to="/counter">Login</Button>
            </Toolbar>
        </AppBar>
    );
  }
}
