// This component is used to display the form dialog that is used to create a notebook

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


class NotebookCreateDialog extends Component {

    openFileExplorer(fileInputId) {
        document.getElementById(fileInputId).click();
    }

    render() {

        return (
            <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Notebook</DialogTitle>
                <DialogContent>
                    {
                        this.props.error.Name == null ?
                            <TextField fullWidth variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} name='name' inputProps={{ maxLength: 50 }} /> :
                            <TextField error helperText={this.props.error.Name[0]} fullWidth variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} name='name' inputProps={{ maxLength: 50 }} />
                    }
                    <input asp-for="File" type="file" accept="image/*" class="form-control" id="createFileInput" hidden onChange={this.props.updateImageFileActionCreator} />
                    <Button variant="contained" color="default" onClick={this.openFileExplorer.bind(this, 'createFileInput')}>
                        Thumbnail
                            <CloudUploadIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                    <Typography variant="caption" display="inline" className={this.props.classes.smallMarginLeft}>
                        {this.props.imageFileName}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeCreateModalActionCreator} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.props.createNotebookActionCreator} color="primary">
                        Submit
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(NotebookCreateDialog);