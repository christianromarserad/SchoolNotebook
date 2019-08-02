import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebooksActionCreator,
    closeCreateModalActionCreator,
    openCreateModalActionCreator,
    createNotebookActionCreator,
    updateTextFieldsActionCreator,
    updateSwitchFieldsActionCreator,
    updateImageFileActionCreator,
    deleteNotebookActionCreator,
    openMenuActionCreator,
    closeMenuActionCreator,
    openEditModalActionCreator,
    closeEditModalActionCreator,
    updateNotebookActionCreator
} from '../../store/Notebook';

const styles = {
    card: {
        maxWidth: 345,
        margin: '5px'
    },
    media: {
        height: 200
    }
};


class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.openMenu = this.openMenu.bind(this);
    }

    componentDidMount() {
        this.props.getNotebooksActionCreator();
    }

    openMenu(id, event) {
        this.props.openMenuActionCreator(id, event);
        event.preventDefault();
    }

    openFileExplorer(fileInputId) {
        document.getElementById(fileInputId).click();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openCreateModalActionCreator}>Create Notebook</Button>
                <Grid container>
                    {this.props.notebooks.map((item) => {
                        return (
                            <Grid key={item.id} item lg={3}>
                                <Card className={this.props.classes.card}>
                                    <CardActionArea centerRipple='true' disableRipple='true' component={Link} to={"/notebook/content/" + item.id}>
                                        <CardMedia
                                            className={this.props.classes.media}
                                            image={item.image || '/Images/lizard.jpg'}
                                            title={item.Name}
                                        />
                                        <Toolbar>
                                            <Typography style={{ flexGrow: 1 }}>
                                                {item.name}
                                            </Typography>
                                            <IconButton onClick={this.openMenu.bind(this, item.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                                <MoreVertIcon style={{ backgroundColor: 'transparent' }} fontSize="small" aria-haspopup="true" />
                                            </IconButton>
                                        </Toolbar>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                <Menu id="fade-menu" anchorEl={this.props.anchorEl} keepMounted open={this.props.isMenuOpen} onClose={this.props.closeMenuActionCreator}>
                    <MenuItem onClick={this.props.deleteNotebookActionCreator.bind(this, this.props.selectedNotebookId)}>
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

                <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Notebook</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
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

                <Dialog open={this.props.isEditModalOpen} onClose={this.props.closeEditModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Bookmark</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
                        <FormControlLabel control={<Switch color="primary" checked={this.props.public} onChange={this.props.updateSwitchFieldsActionCreator.bind(this, 'public')} />} label="Public" />
                        <input asp-for="File" type="file" accept="image/*" class="form-control" id="editFileInput" hidden onChange={this.props.updateImageFileActionCreator} />
                        <Button variant="contained" color="default" onClick={this.openFileExplorer.bind(this, 'editFileInput')}>
                            Thumbnail
                            <CloudUploadIcon className={this.props.classes.smallMarginLeft} />
                        </Button>
                        <Typography variant="caption" display="inline" className={this.props.classes.smallMarginLeft}>
                            {this.props.imageFileName}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeEditModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.updateNotebookActionCreator.bind(this, this.props.selectedNotebookId)} color="primary">
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
        isMenuOpen: state.homePage.notebook.isMenuOpen,
        anchorEl: state.homePage.notebook.anchorEl,
        selectedNotebookId: state.homePage.notebook.selectedNotebookId,
        notebooks: state.homePage.notebook.notebooks,
        isCreateModalOpen: state.homePage.notebook.isCreateModalOpen,
        isEditModalOpen: state.homePage.notebook.isEditModalOpen,
        name: state.homePage.notebook.notebookForm.name,
        public: state.homePage.notebook.notebookForm.public,
        imageFileName: state.homePage.notebook.notebookForm.imageFileName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebooksActionCreator: getNotebooksActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        createNotebookActionCreator: createNotebookActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        updateSwitchFieldsActionCreator: updateSwitchFieldsActionCreator,
        updateImageFileActionCreator: updateImageFileActionCreator,
        deleteNotebookActionCreator: deleteNotebookActionCreator,
        openMenuActionCreator: openMenuActionCreator,
        closeMenuActionCreator: closeMenuActionCreator,
        openEditModalActionCreator: openEditModalActionCreator,
        closeEditModalActionCreator: closeEditModalActionCreator,
        updateNotebookActionCreator: updateNotebookActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Bookmark));