﻿// This component is render the reminder note sectio in the home page

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ReminderNoteItem from '../ReminderNoteItem';
import ReminderNoteCreateDialog from '../ReminderNoteCreateDialog';
import ReminderNoteEditDialog from '../ReminderNoteEditDialog';
import ReminderNoteDeleteDialog from '../ReminderNoteDeleteDialog';
import ReminderNoteItemMenu from '../ReminderNoteItemMenu';
import { Link } from 'react-router-dom';
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
    updateReminderNoteActionCreator,
    openDeleteModalActionCreator,
    closeDeleteModalActionCreator
} from '../../../store/ReminderNote';

const styles = {
    centerSpace: {
        flexGrow: 1
    },
    smallMarginLeft: {
        marginLeft: '10px'
    },
    emptyListMessage: {
        textAlign: 'center'
    }
};

class ReminderNoteHomePage extends Component {

    componentDidMount() {
        this.props.getReminderNotesActionCreator();
    }

    menuItems(reminderNotes) {
        return (
            reminderNotes.map((item) => {
                return (
                    <ReminderNoteItem notes={item.notes} id={item.id} openMenuActionCreator={this.props.openMenuActionCreator} />
                );
            })
        );
    }

    render() {
        const settings = {
            infinite: false,
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
                    <Button color="primary" component={Link} to="/reminderNote">
                        See All
                        <ChevronRightIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                </Toolbar>

                {
                    this.props.reminderNotes.length == 0 ?
                        <Typography variant="h5" gutterBottom className={this.props.classes.emptyListMessage}>
                            No Reminder Notes Available
                        </Typography> : 
                        this.props.reminderNotes.length > 4 ?
                            <Slider {...settings}>
                                {this.menuItems(this.props.reminderNotes)}
                            </Slider> :
                            <Toolbar>{this.menuItems(this.props.reminderNotes)}</Toolbar>
                        
                }

                <ReminderNoteItemMenu anchorEl={this.props.anchorEl} isMenuOpen={this.props.isMenuOpen} closeMenuActionCreator={this.props.closeMenuActionCreator} openDeleteModalActionCreator={this.props.openDeleteModalActionCreator} selectedReminderNoteId={this.props.selectedReminderNoteId} openEditModalActionCreator={this.props.openEditModalActionCreator} />
                <ReminderNoteCreateDialog isCreateModalOpen={this.props.isCreateModalOpen} closeCreateModalActionCreator={this.props.closeCreateModalActionCreator} notes={this.props.notes} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} createReminderNoteActionCreator={this.props.createReminderNoteActionCreator} error={this.props.error}/>
                <ReminderNoteEditDialog isEditModalOpen={this.props.isEditModalOpen} closeEditModalActionCreator={this.props.closeEditModalActionCreator} notes={this.props.notes} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} updateReminderNoteActionCreator={this.props.updateReminderNoteActionCreator} selectedReminderNoteId={this.props.selectedReminderNoteId} error={this.props.error} />
                <ReminderNoteDeleteDialog isDeleteModalOpen={this.props.isDeleteModalOpen} closeDeleteModalActionCreator={this.props.closeDeleteModalActionCreator} deleteReminderNoteActionCreator={this.props.deleteReminderNoteActionCreator} selectedReminderNoteId={this.props.selectedReminderNoteId} />
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
        isDeleteModalOpen: state.homePage.reminderNote.isDeleteModalOpen,
        isEditModalOpen: state.homePage.reminderNote.isEditModalOpen,
        notes: state.homePage.reminderNote.reminderNoteForm.notes,
        error: state.homePage.reminderNote.reminderNoteForm.error
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
        updateReminderNoteActionCreator: updateReminderNoteActionCreator,
        openDeleteModalActionCreator: openDeleteModalActionCreator,
        closeDeleteModalActionCreator: closeDeleteModalActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ReminderNoteHomePage));