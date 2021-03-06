﻿// This component is used to render the notes content of the notebook

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
import NotebookEditor from '../NotebookEditor';
import NotebookPageDeleteDialog from '../NotebookPageDeleteDialog';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import { RichUtils } from 'draft-js';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookPagesActionCreator,
    getNotebookPageActionCreator,
    getDefaultNotebookPageActionCreator,
    createNotebookPageActionCreator,
    updateTextFieldsActionCreator,
    updateNotebookPageActionCreator,
    deleteNotebookPageActionCreator,
    updateEditorStateActionCreator,
    openDeleteModalActionCreator,
    closeDeleteModalActionCreator,
    closeSnackbarActionCreator
} from '../../../store/NotebookContent';

const styles = {
    mainContainer: {
        height: '100%',
        maxHeight: 'inherit',
        overflowY: 'hide'
    },
    gridContainer: {
        height: '100%',
        maxHeight: '100%'
    },
    pagesContainer: {
        width: '100%',
        padding: 15,
        maxHeight: '100%',
        overflowY: 'scroll'
    },
    pageContentContainer: {
        width: '100%',
        padding: '0px 15px 0px 15px',
        maxHeight: '100%'
    },
    activePage: {
        backgroundColor: "#D3D3D3"
    },
    smallMarginLeft: {
        marginLeft: '10px'
    },
    emptyListMessage: {
        textAlign: 'center',
        marginTop: '150px'
    }
};

class NotebookContent extends Component {
    constructor(props) {
        super(props);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.onChangeEditorState = this.onChangeEditorState.bind(this);
        this.saveNotebookPage = this.saveNotebookPage.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.getNotebookPage = this.getNotebookPage.bind(this);
        this.createNotebookPage = this.createNotebookPage.bind(this);

        this.state = {
            timeout: null,
            deletePage: {
                notebookId: null,
                pageNumber: null
            }
        }
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

    getNotebookPage(notebookId, pageNumber) {
        if (this.props.notebookPage.pageNumber != null && this.props.userCanEdit) {
            this.saveNotebookPage();
        }

        this.props.getNotebookPageActionCreator(notebookId, pageNumber);
    }

    createNotebookPage() {
        if (this.props.notebookPage.pageNumber != null && this.props.userCanEdit) {
            this.saveNotebookPage();
        }

        this.props.createNotebookPageActionCreator(this.props.match.params.id);
    }

    openDeleteDialog(notebookId, pageNumber, event) {
        this.setState({
            ...this.state,
            deletePage: {
                notebookId: notebookId,
                pageNumber: pageNumber
            }
        });
        this.props.openDeleteModalActionCreator();
        event.stopPropagation();
    }

    toggleInlineStyle(style, editorState, event) {
        this.props.updateEditorStateActionCreator(RichUtils.toggleInlineStyle(editorState, style));
        event.preventDefault();
    }

    toggleBlockType(style, editorState, event) {
        this.props.updateEditorStateActionCreator(RichUtils.toggleBlockType(editorState, style));
        event.preventDefault();
    }

    onChangeEditorState(editorState) {
        this.props.updateEditorStateActionCreator(editorState);
        clearTimeout(this.state.timeout);
        this.setState({ ...this.state, timeout: setTimeout(this.saveNotebookPage, 2000) })
    }

    onChangeTitle(event) {
        this.props.updateTextFieldsActionCreator(event);
        clearTimeout(this.state.timeout);
        this.setState({ ...this.state, timeout: setTimeout(this.saveNotebookPage, 2000) })
    }

    saveNotebookPage() {
        this.props.updateNotebookPageActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div className={this.props.classes.mainContainer}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.isSnackbarOpen}
                    onClose={this.props.closeSnackbarActionCreator}
                    autoHideDuration={2000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Page Saved</span>}
                />

                <Grid container className={this.props.classes.gridContainer}>
                    <Grid item container lg={4} className={this.props.classes.gridContainer}>
                        <div className={this.props.classes.pagesContainer}>
                            <Grid item lg={12}>
                                {
                                    this.props.userCanEdit ?
                                        <Button style={{ margin: '5px' }} color="primary" onClick={this.createNotebookPage}>
                                            Add Page
                                            <AddIcon className={this.props.classes.smallMarginLeft} />
                                        </Button> :
                                        null
                                }
                            </Grid>
                            {
                                this.props.notebookPages.length == 0 ?
                                    <Typography variant="h5" gutterBottom className={this.props.classes.emptyListMessage}>
                                        No Available Pages
                                    </Typography> :
                                    this.props.notebookPages.map((item) => {
                                        return (
                                            <Grid key={item.pageNumber} item lg={12}>
                                                {
                                                    this.props.notebookPage.pageNumber == item.pageNumber ?
                                                        <Card style={{ margin: '5px' }} className={this.props.classes.activePage}>
                                                            <CardActionArea onClick={this.getNotebookPage.bind(this, item.notebookId, item.pageNumber)}>
                                                                <Toolbar>
                                                                    <Typography style={{ flexGrow: 1 }}>
                                                                        {item.title}
                                                                    </Typography>
                                                                    {
                                                                        this.props.userCanEdit ?
                                                                            <IconButton aria-label="Delete" name="deleteButton" onClick={this.openDeleteDialog.bind(this, item.notebookId, item.pageNumber)}>
                                                                                <DeleteIcon style={{ backgroundColor: 'transparent' }} fontSize="small" />
                                                                            </IconButton> :
                                                                            null
                                                                    }
                                                                </Toolbar>
                                                            </CardActionArea>
                                                        </Card> :
                                                        <Card style={{ margin: '5px' }}>
                                                            <CardActionArea onClick={this.getNotebookPage.bind(this, item.notebookId, item.pageNumber)}>
                                                                <Toolbar>
                                                                    <Typography style={{ flexGrow: 1 }}>
                                                                        {item.title}
                                                                    </Typography>
                                                                    {
                                                                        this.props.userCanEdit ?
                                                                            <IconButton aria-label="Delete" name="deleteButton" onClick={this.openDeleteDialog.bind(this, item.notebookId, item.pageNumber)}>
                                                                                <DeleteIcon style={{ backgroundColor: 'transparent' }} fontSize="small" />
                                                                            </IconButton> :
                                                                            null
                                                                    }
                                                                </Toolbar>
                                                            </CardActionArea>
                                                        </Card>
                                                }

                                            </Grid>
                                        )
                                    })}
                        </div>
                    </Grid>
                    <Grid item container lg={8} className={this.props.classes.gridContainer}>
                        {
                            this.props.notebookPage.notebookId == null ?
                                <Grid item lg={12}>
                                    <Typography variant="h5" gutterBottom className={this.props.classes.emptyListMessage}>
                                        Select a page
                                    </Typography>
                                </Grid> :
                                <div className={this.props.classes.pageContentContainer}>
                                    <NotebookEditor
                                        userCanEdit={this.props.userCanEdit}
                                        editorState={this.props.notebookPage.editorState}
                                        styles={this.props.notebookPage.styles}
                                        toggleInlineStyle={this.toggleInlineStyle}
                                        toggleBlockType={this.toggleBlockType}
                                        onChangeEditorState={this.onChangeEditorState}
                                        title={this.props.notebookPage.title}
                                        updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator}
                                        onChangeTitle={this.onChangeTitle}
                                    />
                                </div>
                        }
                    </Grid>
                </Grid>
                <NotebookPageDeleteDialog isDeleteModalOpen={this.props.isDeleteModalOpen} closeDeleteModalActionCreator={this.props.closeDeleteModalActionCreator} deleteNotebookPageActionCreator={this.props.deleteNotebookPageActionCreator} notebookId={this.state.deletePage.notebookId} pageNumber={this.state.deletePage.pageNumber} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDeleteModalOpen: state.notebookPage.notebookContent.isDeleteModalOpen,
        isSnackbarOpen: state.notebookPage.notebookContent.isSnackbarOpen,
        notebookPages: state.notebookPage.notebookContent.notebookPages,
        notebookPage: state.notebookPage.notebookContent.notebookPage,
        userCanEdit: state.notebookPage.notebookPermission.userCanEdit
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
        deleteNotebookPageActionCreator: deleteNotebookPageActionCreator,
        updateEditorStateActionCreator: updateEditorStateActionCreator,
        openDeleteModalActionCreator: openDeleteModalActionCreator,
        closeDeleteModalActionCreator: closeDeleteModalActionCreator,
        closeSnackbarActionCreator: closeSnackbarActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookContent));