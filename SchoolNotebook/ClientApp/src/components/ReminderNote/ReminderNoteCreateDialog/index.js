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