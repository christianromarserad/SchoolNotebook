import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import NotebookContent from './notebook/NotebookContent';
import NotebookComments from './notebook/NotebookComments';
import NotebookShare from './notebook/NotebookShare';
import NotebookSettings from './notebook/NotebookSettings';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookActionCreator
} from '../store/NotebookPage';

class Notebook extends Component {
    componentDidMount() {
        this.props.getNotebookActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Paper square>
                        <Grid container alignItems="center">
                            <Grid item style={{ flexGrow: 1 }}>
                                <Toolbar>
                                    <Typography variant="h5">
                                        {this.props.name}
                                    </Typography>
                                </Toolbar>
                            </Grid>
                            <Grid item>
                                <Tabs value={this.props.location.pathname} indicatorColor="primary" textColor="primary">
                                    <Tab label="Content" component={Link} to={"/notebook/content/" + this.props.notebookId} value={"/notebook/content/" + this.props.notebookId} />
                                    <Tab label="Comments" component={Link} to={"/notebook/comments/" + this.props.notebookId} value={"/notebook/comments/" + this.props.notebookId} />
                                    <Tab label="Share" component={Link} to={"/notebook/share/" + this.props.notebookId} value={"/notebook/share/" + this.props.notebookId} />
                                    <Tab style={{ height: '64px'}} label="Settings" component={Link} to={"/notebook/settings/" + this.props.notebookId} value={"/notebook/settings/" + this.props.notebookId} />
                                </Tabs>
                            </Grid>
                        </Grid>
                </Paper>

                <Route exact path='/notebook/content/:id(\d+)' component={NotebookContent} />
                <Route exact path='/notebook/comments/:id(\d+)' component={NotebookComments} />
                <Route exact path='/notebook/share/:id(\d+)' component={NotebookShare} />
                <Route exact path='/notebook/settings/:id(\d+)' component={NotebookSettings} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notebookId: state.notebookPage.notebookId,
        name: state.notebookPage.name
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getNotebookActionCreator: getNotebookActionCreator }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notebook));