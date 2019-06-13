import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReminderNotesActionCreator, closeReminderNoteModalActionCreator, openReminderNoteModalActionCreator, createReminderNoteActionCreator, updateTextFieldsActionCreator } from '../../store/ReminderNote';

class ReminderNote extends Component {

    componentDidMount() {
        this.props.getReminderNotesActionCreator();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openReminderNoteModalActionCreator}>Create Reminder Note</Button>
                <div>
                    {this.props.reminderNotes.map((item) => {
                        return <Button variant="contained" color="default">{item.notes}</Button>
                    })}
                </div>
                <Dialog open={this.props.isModalOpen} onClose={this.props.closeReminderNoteModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Reminder Note</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="Notes" value={this.props.notes} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='notes' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeReminderNoteModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.createReminderNoteActionCreator} color="primary">
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
        reminderNotes: state.reminderNote.reminderNotes,
        isModalOpen: state.reminderNote.isModalOpen,
        notes: state.reminderNote.reminderNoteForm.notes
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReminderNotesActionCreator: getReminderNotesActionCreator,
        closeReminderNoteModalActionCreator: closeReminderNoteModalActionCreator,
        openReminderNoteModalActionCreator: openReminderNoteModalActionCreator,
        createReminderNoteActionCreator: createReminderNoteActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderNote);