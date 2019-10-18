import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/styles';


const styles = {
    smallMarginLeft: {
        marginLeft: '10px'
    }
};


class NotebookPageDeleteDialog extends Component {

    render() {

        return (
            <Dialog open={this.props.isDeleteModalOpen} onClose={this.props.closeDeleteModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Notebook Page</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this page?
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDeleteModalActionCreator} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.deleteNotebookPageActionCreator.bind(this, this.props.notebookId, this.props.pageNumber)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(NotebookPageDeleteDialog);