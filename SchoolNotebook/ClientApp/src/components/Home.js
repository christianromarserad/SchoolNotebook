import React, { Component } from 'react';
import Bookmark from './home/Bookmark';
import ReminderNote from './home/ReminderNote';
import Notebook from './home/Notebook';
import { withStyles } from '@material-ui/styles';

const styles = {
    home: {
        margin: 40
    }
};

class Home extends Component {

    render() {
        return (
            <div className={this.props.classes.home}>
                <Bookmark />
                <ReminderNote />
                <Notebook />
            </div>
        );
    }
}

export default withStyles(styles)(Home);