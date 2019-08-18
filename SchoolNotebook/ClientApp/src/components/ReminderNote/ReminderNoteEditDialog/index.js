﻿import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class ReminderNoteEditDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.isEditModalOpen} onClose={this.props.closeEditModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Reminder Note</DialogTitle>
                <DialogContent>
                    <TextField margin="normal" label="Notes" value={this.props.notes} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='notes' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeEditModalActionCreator} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.props.updateReminderNoteActionCreator.bind(this, this.props.selectedReminderNoteId)} color="primary">
                        Submit
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default (ReminderNoteEditDialog);