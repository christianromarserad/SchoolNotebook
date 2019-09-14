import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Switch from '@material-ui/core/Switch';
import Ratings from 'react-ratings-declarative';
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
                            <TextField fullWidth variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} name='name' /> :
                            <TextField error helperText={this.props.error.Name[0]} fullWidth variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} name='name' />
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