import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBookmarksActionCreator, closeBookmarkModalActionCreator, openBookmarkModalActionCreator, createBookmarkActionCreator, updateTextFieldsActionCreator } from '../../store/Bookmark';

class Bookmark extends Component {

    componentDidMount() {
        this.props.getBookmarksActionCreator();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openBookmarkModalActionCreator}>Create Bookmark</Button>
                <div>
                    {this.props.bookmarks.map((item) => {
                        return <Button variant="contained" color="default">{item.name}</Button>
                    })}
                </div>
                <Dialog open={this.props.isModalOpen} onClose={this.props.closeBookmarkModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Bookmark</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="URL" value={this.props.url} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='url' />
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeBookmarkModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.createBookmarkActionCreator} color="primary">
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
        isModalOpen: state.bookmark.isModalOpen,
        url: state.bookmark.bookmarkForm.url,
        name: state.bookmark.bookmarkForm.name
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBookmarksActionCreator: getBookmarksActionCreator,
        openBookmarkModalActionCreator: openBookmarkModalActionCreator,
        closeBookmarkModalActionCreator: closeBookmarkModalActionCreator,
        createBookmarkActionCreator: createBookmarkActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);