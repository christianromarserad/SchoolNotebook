import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ReminderNoteDeleteDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.isDeleteModalOpen} onClose={this.props.closeDeleteModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Reminder Note</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this reminder note?
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDeleteModalActionCreator} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.deleteReminderNoteActionCreator.bind(this, this.props.selectedReminderNoteId)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default (ReminderNoteDeleteDialog);