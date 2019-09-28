import React, { Component } from 'react';
import BookmarkHomePage from './Bookmark/BookmarkHomePage';
import ReminderNoteHomePage from './ReminderNote/ReminderNoteHomePage';
import NotebookHomePage from './Notebook/NotebookHomePage';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

const styles = {
    margin: {
        margin: '40px'
    }
};

class Home extends Component {

    render() {
        return (
            <div className={this.props.classes.margin}>
                <Grid container spacing={8}>
                    <Grid item lg={12} >
                        <BookmarkHomePage />
                    </Grid>
                    <Grid item lg={12} >
                        <ReminderNoteHomePage />
                    </Grid>
                    <Grid item lg={12} >
                        <NotebookHomePage />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Home);