import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getBookmarksActionCreator,
    closeCreateModalActionCreator,
    openCreateModalActionCreator,
    createBookmarkActionCreator,
    updateTextFieldsActionCreator,
    deleteBookmarkActionCreator,
    openEditModalActionCreator,
    closeEditModalActionCreator,
    updateBookmarkActionCreator
} from '../../store/Bookmark';

class Bookmark extends Component {

    componentDidMount() {
        this.props.getBookmarksActionCreator();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openCreateModalActionCreator}>Create Bookmark</Button>
                <Grid container>
                    {this.props.bookmarks.map((item) => {
                        return (
                            <Grid item lg={3}>
                                <Paper style={{ margin: '5px' }}>
                                    <Toolbar>
                                        <Typography style={{ flexGrow: 1 }}>
                                            {item.name}
                                        </Typography>
                                        <IconButton aria-label="Delete">
                                            <EditIcon fontSize="small" onClick={this.props.openEditModalActionCreator.bind(this, item.id)} />
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.props.deleteBookmarkActionCreator.bind(this,item.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Toolbar>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

                <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Bookmark</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="URL" value={this.props.url} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='url' />
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeCreateModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.createBookmarkActionCreator} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.props.isEditModalOpen} onClose={this.props.closeEditModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Bookmark</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="URL" value={this.props.url} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='url' />
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeEditModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.updateBookmarkActionCreator} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookmarks: state.bookmark.bookmarks,
        isCreateModalOpen: state.bookmark.isCreateModalOpen,
        isEditModalOpen: state.bookmark.isEditModalOpen,
        url: state.bookmark.bookmarkForm.url,
        name: state.bookmark.bookmarkForm.name
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBookmarksActionCreator: getBookmarksActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        createBookmarkActionCreator: createBookmarkActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        deleteBookmarkActionCreator: deleteBookmarkActionCreator,
        openEditModalActionCreator: openEditModalActionCreator,
        closeEditModalActionCreator: closeEditModalActionCreator,
        updateBookmarkActionCreator: updateBookmarkActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);