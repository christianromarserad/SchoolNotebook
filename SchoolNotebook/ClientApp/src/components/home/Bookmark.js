import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    openMenuActionCreator,
    closeMenuActionCreator,
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
                            <Grid key={item.id} item lg={3}>
                                <Paper style={{ margin: '5px' }}>
                                    <Toolbar>
                                        <Typography style={{ flexGrow: 1 }}>
                                            {item.name}
                                        </Typography>
                                        <IconButton onClick={this.props.openMenuActionCreator.bind(this, item.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                            <MoreVertIcon fontSize="small" aria-haspopup="true" />
                                        </IconButton>
                                    </Toolbar>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

                <Menu id="fade-menu" anchorEl={this.props.anchorEl} keepMounted open={this.props.isMenuOpen} onClose={this.props.closeMenuActionCreator}>
                    <MenuItem onClick={this.props.deleteBookmarkActionCreator.bind(this, this.props.selectedBookmarkId)}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </MenuItem>
                    <MenuItem onClick={this.props.openEditModalActionCreator.bind(this, this.props.selectedBookmarkId)}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </MenuItem>
                </Menu>

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
                        <Button onClick={this.props.updateBookmarkActionCreator.bind(this, this.props.selectedBookmarkId)} color="primary">
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
        bookmarks: state.homePage.bookmark.bookmarks,
        isCreateModalOpen: state.homePage.bookmark.isCreateModalOpen,
        isEditModalOpen: state.homePage.bookmark.isEditModalOpen,
        isMenuOpen: state.homePage.bookmark.isMenuOpen,
        anchorEl: state.homePage.bookmark.anchorEl,
        selectedBookmarkId: state.homePage.bookmark.selectedBookmarkId,
        url: state.homePage.bookmark.bookmarkForm.url,
        name: state.homePage.bookmark.bookmarkForm.name
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
        updateBookmarkActionCreator: updateBookmarkActionCreator,
        openMenuActionCreator: openMenuActionCreator,
        closeMenuActionCreator: closeMenuActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);