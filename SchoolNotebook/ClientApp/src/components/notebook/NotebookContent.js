﻿import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookPagesActionCreator,
    getNotebookPageActionCreator,
    getDefaultNotebookPageActionCreator,
    createNotebookPageActionCreator
} from '../../store/NotebookContent';

class NotebookContent extends Component {

    componentDidMount() {
        this.props.getNotebookPagesActionCreator(this.props.match.params.id);

        if (this.props.match.params.id == this.props.notebookId && this.props.notebookPage.pageNumber != null) {
            this.props.getNotebookPageActionCreator(this.props.match.params.id, this.props.notebookPageNumberSelected);
        }
        else {
            this.props.getDefaultNotebookPageActionCreator(this.props.match.params.id);
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item container lg={4}>
                        <Grid item lg={12}>
                            <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.createNotebookPageActionCreator}>Add Page</Button>
                        </Grid>
                        {this.props.notebookPages.map((item) => {
                            return (
                                <Grid key={item.pageNumber} item lg={12}>
                                    <Card style={{ margin: '5px' }}>
                                        <CardActionArea onClick={this.props.getNotebookPageActionCreator.bind(this, item.notebookId, item.pageNumber)}>
                                            <Toolbar>
                                                <Typography style={{ flexGrow: 1 }}>
                                                    {item.title}
                                                </Typography>
                                            </Toolbar>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item lg={8}>
                        <TextField margin="normal" label="Title" value={this.props.notebookPage.title} fullWidth name='title' />
                        <TextField margin="normal" label="Notes" value={this.props.notebookPage.notes} fullWidth name='notes' />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notebookId: state.notebookContent.notebookId,
        notebookPages: state.notebookContent.notebookPages,
        notebookPage: state.notebookContent.notebookPage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookPagesActionCreator: getNotebookPagesActionCreator,
        getNotebookPageActionCreator: getNotebookPageActionCreator,
        getDefaultNotebookPageActionCreator: getDefaultNotebookPageActionCreator,
        createNotebookPageActionCreator: createNotebookPageActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookContent);