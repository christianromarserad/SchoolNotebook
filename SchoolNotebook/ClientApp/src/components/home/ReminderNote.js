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
import { getReminderNotesActionCreator, closeReminderNoteModalActionCreator, openReminderNoteModalActionCreator, createReminderNoteActionCreator, updateTextFieldsActionCreator, deleteReminderNoteActionCreator } from '../../store/ReminderNote';
import { deleteBookmarkActionCreator } from '../../store/Bookmark';

class ReminderNote extends Component {

    componentDidMount() {
        this.props.getReminderNotesActionCreator();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openReminderNoteModalActionCreator}>Create Reminder Note</Button>
                <Grid container>
                    {this.props.reminderNotes.map((item) => {
                        return (
                            <Grid item lg={3}>
                                <Paper style={{ margin: '5px' }}>
                                    <Toolbar>
                                        <Typography style={{ flexGrow: 1 }}>
                                            {item.notes}
                                        </Typography>
                                        <IconButton aria-label="Delete">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.props.deleteReminderNoteActionCreator.bind(this, item.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Toolbar>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
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
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        deleteReminderNoteActionCreator: deleteReminderNoteActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderNote);