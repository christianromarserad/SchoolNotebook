import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import NotebookContent from './notebook/NotebookContent';
import NotebookComments from './notebook/NotebookComments';
import NotebookShare from './notebook/NotebookShare';
import NotebookSettings from './notebook/NotebookSettings';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';

class Notebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notebookId: this.props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <Paper square>
                    <Tabs value={this.props.location.pathname} indicatorColor="primary" textColor="primary">
                        <Tab label="Content" component={Link} to={"/notebook/content/" + this.state.notebookId} value={"/notebook/content/" + this.state.notebookId} />
                        <Tab label="Comments" component={Link} to={"/notebook/comments/" + this.state.notebookId} value={"/notebook/comments/" + this.state.notebookId}/>
                        <Tab label="Share" component={Link} to={"/notebook/share/" + this.state.notebookId} value={"/notebook/share/" + this.state.notebookId}/>
                        <Tab label="Settings" component={Link} to={"/notebook/settings/" + this.state.notebookId} value={"/notebook/settings/" + this.state.notebookId}/>
                    </Tabs>
                </Paper>

                <Route exact path='/notebook/content/:id(\d+)' component={NotebookContent} />
                <Route exact path='/notebook/comments/:id(\d+)' component={NotebookComments} />
                <Route exact path='/notebook/share/:id(\d+)' component={NotebookShare} />
                <Route exact path='/notebook/settings/:id(\d+)' component={NotebookSettings} />
            </div>
        );
    }
}

export default withRouter(Notebook);