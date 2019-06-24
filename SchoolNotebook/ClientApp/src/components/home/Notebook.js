import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebooksActionCreator,
    closeCreateModalActionCreator,
    openCreateModalActionCreator,
    createNotebookActionCreator,
    updateTextFieldsActionCreator,
    deleteNotebookActionCreator,
    openMenuActionCreator,
    closeMenuActionCreator,
    openEditModalActionCreator,
    closeEditModalActionCreator,
    updateNotebookActionCreator
} from '../../store/Notebook';

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

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openCreateModalActionCreator}>Create Notebook</Button>
                <Grid container>
                    {this.props.notebooks.map((item) => {
                        return (
                            <Grid key={item.id} item lg={3}>
                                <Card style={{ margin: '5px' }}>
                                    <CardActionArea centerRipple='true' disableRipple='true' component={Link} to={"/notebook/content/" + item.id}>
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
                        <TextField margin="normal" label="Name" value={this.props.public} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='public' />
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
        isMenuOpen: state.notebook.isMenuOpen,
        anchorEl: state.notebook.anchorEl,
        selectedNotebookId: state.notebook.selectedNotebookId,
        notebooks: state.notebook.notebooks,
        isCreateModalOpen: state.notebook.isCreateModalOpen,
        isEditModalOpen: state.notebook.isEditModalOpen,
        name: state.notebook.notebookForm.name,
        public: state.notebook.notebookForm.public
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebooksActionCreator: getNotebooksActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        createNotebookActionCreator: createNotebookActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        deleteNotebookActionCreator: deleteNotebookActionCreator,
        openMenuActionCreator: openMenuActionCreator,
        closeMenuActionCreator: closeMenuActionCreator,
        openEditModalActionCreator: openEditModalActionCreator,
        closeEditModalActionCreator: closeEditModalActionCreator,
        updateNotebookActionCreator: updateNotebookActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);