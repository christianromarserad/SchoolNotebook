import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
    getReminderNotesActionCreator,
    closeCreateModalActionCreator,
    openCreateModalActionCreator,
    createReminderNoteActionCreator,
    updateTextFieldsActionCreator,
    deleteReminderNoteActionCreator,
    openMenuActionCreator,
    closeMenuActionCreator,
    openEditModalActionCreator,
    closeEditModalActionCreator,
    updateReminderNoteActionCreator
} from '../../store/ReminderNote';

const styles = {
    card: {
        margin: 5,
        backgroundColor: '#FFFACD',
        width: 250,
        maxWidth: 250,
        height: 200
    },
    centerSpace: {
        flexGrow: 1
    },
    smallMarginLeft: {
        marginLeft: '10px'
    }
};

class ReminderNote extends Component {

    componentDidMount() {
        this.props.getReminderNotesActionCreator();
    }

    menuItems(reminderNotes) {
        return (
            reminderNotes.map((item) => {
                return (
                    <Paper className={this.props.classes.card}>
                        <Toolbar>
                            <Typography style={{ flexGrow: 1 }}>
                                {item.notes}
                            </Typography>
                            <IconButton onClick={this.props.openMenuActionCreator.bind(this, item.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                <MoreVertIcon fontSize="small" aria-haspopup="true" />
                            </IconButton>
                        </Toolbar>
                    </Paper>
                );
            })
        );
    }

    render() {
        const settings = {
            infinite: true,
            accessibility: true,
            arrows: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1
        };

        return (
            <div>
                <Divider />
                <Toolbar>
                    <Typography variant="h6" gutterBottom>
                        Reminder Notes
                    </Typography>
                    <div className={this.props.classes.centerSpace}></div>
                    <Button color="primary" onClick={this.props.openCreateModalActionCreator}>
                        Add
                        <AddIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                    <Button color="primary">
                        See All
                        <ChevronRightIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                </Toolbar>

                <Slider {...settings}>
                    {this.menuItems(this.props.reminderNotes)}
                </Slider>

                <Menu id="fade-menu" anchorEl={this.props.anchorEl} keepMounted open={this.props.isMenuOpen} onClose={this.props.closeMenuActionCreator}>
                    <MenuItem onClick={this.props.deleteReminderNoteActionCreator.bind(this, this.props.selectedReminderNoteId)}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </MenuItem>
                    <MenuItem onClick={this.props.openEditModalActionCreator.bind(this, this.props.selectedReminderNoteId)}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </MenuItem>
                </Menu>

                <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Reminder Note</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="Notes" value={this.props.notes} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='notes' />
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        anchorEl: state.homePage.reminderNote.anchorEl,
        isMenuOpen: state.homePage.reminderNote.isMenuOpen,
        selectedReminderNoteId: state.homePage.reminderNote.selectedReminderNoteId,
        reminderNotes: state.homePage.reminderNote.reminderNotes,
        isCreateModalOpen: state.homePage.reminderNote.isCreateModalOpen,
        isEditModalOpen: state.homePage.reminderNote.isEditModalOpen,
        notes: state.homePage.reminderNote.reminderNoteForm.notes
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReminderNotesActionCreator: getReminderNotesActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        createReminderNoteActionCreator: createReminderNoteActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        deleteReminderNoteActionCreator: deleteReminderNoteActionCreator,
        openMenuActionCreator: openMenuActionCreator,
        closeMenuActionCreator: closeMenuActionCreator,
        openEditModalActionCreator: openEditModalActionCreator,
        closeEditModalActionCreator: closeEditModalActionCreator,
        updateReminderNoteActionCreator: updateReminderNoteActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ReminderNote));