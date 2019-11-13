// This component is used to display the dialog form to create a bookmark

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';




class BookmarkCreateDialog extends Component {

    render() {
        return (
            <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Bookmark</DialogTitle>
                <DialogContent>
                    {
                        this.props.error.Url == null ?
                            <TextField variant="outlined" margin="normal" label="URL" value={this.props.url} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='url' /> :
                            <TextField error helperText={this.props.error.Url[0]} variant="outlined" margin="normal" label="URL" value={this.props.url} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='url' />
                    }
                    {
                        this.props.error.Name == null ?
                            <TextField variant="outlined" margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' inputProps={{ maxLength: 50 }} /> :
                            <TextField error helperText={this.props.error.Name[0]} variant="outlined" margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' inputProps={{ maxLength: 50 }}/> 
                    }
                   
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
        );
    }
}


export default (BookmarkCreateDialog);