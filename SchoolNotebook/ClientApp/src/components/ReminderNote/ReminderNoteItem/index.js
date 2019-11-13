// This component is used to render a reminder note

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
import { withStyles } from '@material-ui/styles';

const styles = {
    card: {
        margin: 5,
        backgroundColor: '#FFFACD',
        width: 250,
        maxWidth: 250,
        height: 200
    },
    noteContent: {
        flexGrow: 1
    },
    smallMarginLeft: {
        marginLeft: '10px'
    }
};

class ReminderNoteItem extends Component {
    render() {
        return (
            <Paper className={this.props.classes.card}>
                <Toolbar>
                    <Typography className={this.props.classes.noteContent}>
                        {this.props.notes}
                    </Typography>
                    <IconButton onClick={this.props.openMenuActionCreator.bind(this, this.props.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                        <MoreVertIcon fontSize="small" aria-haspopup="true" />
                    </IconButton>
                </Toolbar>
            </Paper>
        );
    }
}

export default withStyles(styles)(ReminderNoteItem);