import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookPagesActionCreator,
    getNotebookPageActionCreator,
    getDefaultNotebookPageActionCreator,
    createNotebookPageActionCreator,
    updateTextFieldsActionCreator,
    updateNotebookPageActionCreator,
    deleteNotebookPageActionCreator
} from '../../store/NotebookContent';

class NotebookContent extends Component {
    constructor(props) {
        super(props);
        this.deleteNotebookPage = this.deleteNotebookPage.bind(this);
    }

    componentDidMount() {
        this.props.getNotebookPagesActionCreator(this.props.match.params.id);
        if (this.props.match.params.id == this.props.notebookPage.notebookId && this.props.notebookPage.pageNumber != null) {
            
            this.props.getNotebookPageActionCreator(this.props.match.params.id, this.props.notebookPage.pageNumber);
        }
        else {
            this.props.getDefaultNotebookPageActionCreator(this.props.match.params.id);
        }
    }

    deleteNotebookPage(notebookId, pageNumber, event) {
        this.props.deleteNotebookPageActionCreator(notebookId, pageNumber);
        event.stopPropagation();
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item container lg={4}>
                        <Grid item lg={12}>
                            <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.createNotebookPageActionCreator.bind(this, this.props.match.params.id)}>Add Page</Button>
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
                                                <IconButton aria-label="Delete" name="deleteButton" onClick={this.deleteNotebookPage.bind(this, item.notebookId, item.pageNumber)}>
                                                    <DeleteIcon style={{ backgroundColor: 'transparent' }} fontSize="small" />
                                                </IconButton>
                                            </Toolbar>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item lg={8}>
                        <TextField margin="normal" label="Title" value={this.props.notebookPage.title} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='title' />
                        <TextField margin="normal" label="Notes" value={this.props.notebookPage.notes} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='notes' />
                        <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.updateNotebookPageActionCreator.bind(this, this.props.match.params.id)}>Update Page</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notebookPages: state.notebookPage.notebookContent.notebookPages,
        notebookPage: state.notebookPage.notebookContent.notebookPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookPagesActionCreator: getNotebookPagesActionCreator,
        getNotebookPageActionCreator: getNotebookPageActionCreator,
        getDefaultNotebookPageActionCreator: getDefaultNotebookPageActionCreator,
        createNotebookPageActionCreator: createNotebookPageActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        updateNotebookPageActionCreator: updateNotebookPageActionCreator,
        deleteNotebookPageActionCreator: deleteNotebookPageActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookContent);