// This component is used to display the form dialog that is used to create a reminder note

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ReminderNoteCreateDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Reminder Note</DialogTitle>
                <DialogContent>
                    {
                        this.props.error.Notes == null ? 
                            <TextField fullWidth multiline variant="outlined" margin="normal" label="Notes" value={this.props.notes} onChange={this.props.updateTextFieldsActionCreator} name='notes' inputProps={{ maxLength: 160 }} /> :
                            <TextField error helperText={this.props.error.Notes[0]} fullWidth multiline variant="outlined" margin="normal" label="Notes" value={this.props.notes} onChange={this.props.updateTextFieldsActionCreator} name='notes' inputProps={{ maxLength: 160 }} /> 
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeCreateModalActionCreator} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.props.createReminderNoteActionCreator} color="primary">
                        Submit
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default (ReminderNoteCreateDialog);