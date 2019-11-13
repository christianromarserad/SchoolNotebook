// This component is is used to display the menu item that has options to delete and edit a notebook

import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class NotebookItemMenu extends Component {

    render() {
        return (
            <Menu id="fade-menu" anchorEl={this.props.anchorEl} keepMounted open={this.props.isMenuOpen} onClose={this.props.closeMenuActionCreator}>
                <MenuItem onClick={this.props.openDeleteModalActionCreator}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
                <MenuItem onClick={this.props.openEditModalActionCreator.bind(this, this.props.selectedNotebookId)}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
            </Menu>
        );
    }
}

export default (NotebookItemMenu);