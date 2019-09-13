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
import NotebookEditor from './NotebookEditor';
import Paper from '@material-ui/core/Paper';
import { RichUtils } from 'draft-js';
import { withStyles } from '@material-ui/styles';
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
    deleteNotebookPageActionCreator,
    updateEditorStateActionCreator
} from '../../store/NotebookContent';

const styles = {
    mainContainer: {
        height: '100%',
        maxHeight: 'inherit'
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
        maxHeight: '100%',
        overflowY: 'auto'
    }
};

class NotebookContent extends Component {
    constructor(props) {
        super(props);
        this.deleteNotebookPage = this.deleteNotebookPage.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.onChangeEditorState = this.onChangeEditorState.bind(this);
        this.saveNotebookPage = this.saveNotebookPage.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.state = {
            timeout: null,
            saved: false
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
        this.setState({ ...this.state, saved: true });
        this.props.updateNotebookPageActionCreator(this.props.match.params.id);
        setTimeout(() => this.setState({ ...this.state, saved: false }), 2000)
    }

    deleteNotebookPage(notebookId, pageNumber, event) {
        this.props.deleteNotebookPageActionCreator(notebookId, pageNumber);
        event.stopPropagation();
    }

    render() {
        return (
            <div className={this.props.classes.mainContainer}>
                <Grid container className={this.props.classes.gridContainer}>
                    <Grid item container lg={4} className={this.props.classes.gridContainer}>
                        <div className={this.props.classes.pagesContainer}>
                            <Grid item lg={12}>
                                {this.props.userCanEdit ? <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.createNotebookPageActionCreator.bind(this, this.props.match.params.id)}>Add Page</Button> : null}
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
                                                    {
                                                        this.props.userCanEdit ?
                                                            <IconButton aria-label="Delete" name="deleteButton" onClick={this.deleteNotebookPage.bind(this, item.notebookId, item.pageNumber)}>
                                                                <DeleteIcon style={{ backgroundColor: 'transparent' }} fontSize="small" />
                                                            </IconButton> :
                                                            null
                                                    }
                                                </Toolbar>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </div>
                    </Grid>
                    <Grid item container lg={8} className={this.props.classes.gridContainer}>
                        <div className={this.props.classes.pageContentContainer}>
                            <NotebookEditor
                                userCanEdit={this.props.userCanEdit}
                                editorState={this.props.notebookPage.editorState}
                                toggleInlineStyle={this.toggleInlineStyle}
                                toggleBlockType={this.toggleBlockType}
                                onChangeEditorState={this.onChangeEditorState}
                                saved={this.state.saved}
                                title={this.props.notebookPage.title}
                                updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator}
                                onChangeTitle={this.onChangeTitle}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
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
        updateEditorStateActionCreator: updateEditorStateActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookContent));