// This component is used to display the confirmation dialog that is used to delete a notebook

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';


const styles = {
    smallMarginLeft: {
        marginLeft: '10px'
    }
};


class NotebookDeleteDialog extends Component {

    openFileExplorer(fileInputId) {
        document.getElementById(fileInputId).click();
    }

    render() {

        return (
            <Dialog open={this.props.isDeleteModalOpen} onClose={this.props.closeDeleteModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Notebook</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this notebook?
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDeleteModalActionCreator} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.deleteNotebookActionCreator.bind(this, this.props.selectedNotebookId)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(NotebookDeleteDialog);