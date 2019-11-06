import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookPermissionsActionCreator,
    updateTextFieldsActionCreator,
    updateSwitchFieldsActionCreator,
    openCreateModalActionCreator,
    closeCreateModalActionCreator,
    createNotebookPermissionActionCreator,
    updateCanEditPermissionActionCreator,
    deleteNotebookPermissionActionCreator,
    openDeleteModalActionCreator,
    closeDeleteModalActionCreator
} from '../../../store/NotebookShare';

const styles = {
    mainContainer: {
        padding: '30px'
    },
    header: {
        width: '100%',
        marginBottom: '30px'
    },
    headerTitle: {
        flexGrow: 1
    },
    permissionItem: {
        width: '100%'
    },
    smallMarginLeft: {
        marginLeft: '10px'
    },
    emptyListMessage: {
        textAlign: 'center'
    }
};

class NotebookShare extends Component {
    componentDidMount() {
        this.props.getNotebookPermissionsActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div className={this.props.classes.mainContainer}>
                <Grid container>
                    <Toolbar className={this.props.classes.header}>
                        <Typography variant="h5" gutterBottom className={this.props.classes.headerTitle}>
                            People who can access:
                        </Typography>
                        <Button color="primary" onClick={this.props.openCreateModalActionCreator}>
                            Add
                            <AddIcon className={this.props.classes.smallMarginLeft} />
                        </Button>
                    </Toolbar>

                    <Grid item container lg={12}>
                        {
                            this.props.notebookPermissions.length == 0 ?
                                <Grid item lg={12}><h1 className={this.props.classes.emptyListMessage}>No available users that can access</h1></Grid> :
                                this.props.notebookPermissions.map((item) => {
                                    return (
                                        <Grid key={item.user} item lg={12}>
                                            <Divider />
                                            <CardHeader
                                                className={this.props.classes.permissionItem}
                                                avatar={
                                                    <Avatar alt={item.userName} src={item.userPicture} />
                                                }
                                                title={
                                                    <div>
                                                        <Typography variant="body2" display="inline" className={this.props.classes.userName}>
                                                            {item.userName}
                                                        </Typography>
                                                    </div>
                                                }
                                                subheader={item.user}
                                                action={
                                                    <div>
                                                        <FormControlLabel control={<Switch color="primary" checked={item.canEdit} onChange={this.props.updateCanEditPermissionActionCreator.bind(this, item)} />} label="Can Edit" />
                                                        <IconButton aria-label="Delete" onClick={this.props.openDeleteModalActionCreator.bind(this, item.notebookId, item.user)}>
                                                            <DeleteIcon style={{ backgroundColor: 'transparent' }} fontSize="small" />
                                                        </IconButton>
                                                    </div>
                                                }
                                            />
                                        </Grid>
                                    )
                                })}
                    </Grid>
                </Grid>

                <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Bookmark</DialogTitle>
                    <DialogContent>
                        {
                            this.props.error == null ?
                                <TextField variant="outlined" margin="normal" label="User" value={this.props.user} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='user' /> :
                                <TextField error helperText={this.props.error} variant="outlined" margin="normal" label="User" value={this.props.user} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='user' />
                        }
                        <FormControlLabel control={<Switch color="primary" checked={this.props.canEdit} onChange={this.props.updateSwitchFieldsActionCreator.bind(this, 'canEdit')} />} label="Can Edit" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeCreateModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.createNotebookPermissionActionCreator.bind(this, this.props.match.params.id)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog open={this.props.isDeleteModalOpen} onClose={this.props.closeDeleteModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this user from the share list?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeDeleteModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.deleteNotebookPermissionActionCreator.bind(this, this.props.selectedNotebookShareId, this.props.selectedNotebookShareUser)} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.notebookPage.notebookShare.notebookShareForm.user,
        canEdit: state.notebookPage.notebookShare.notebookShareForm.canEdit,
        error: state.notebookPage.notebookShare.notebookShareForm.error,
        notebookPermissions: state.notebookPage.notebookShare.notebookPermissions,
        isCreateModalOpen: state.notebookPage.notebookShare.isCreateModalOpen,
        isDeleteModalOpen: state.notebookPage.notebookShare.isDeleteModalOpen,
        selectedNotebookShareId: state.notebookPage.notebookShare.selectedNotebookShareId,
        selectedNotebookShareUser: state.notebookPage.notebookShare.selectedNotebookShareUser
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookPermissionsActionCreator: getNotebookPermissionsActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        updateSwitchFieldsActionCreator: updateSwitchFieldsActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        createNotebookPermissionActionCreator: createNotebookPermissionActionCreator,
        updateCanEditPermissionActionCreator: updateCanEditPermissionActionCreator,
        deleteNotebookPermissionActionCreator: deleteNotebookPermissionActionCreator,
        openDeleteModalActionCreator: openDeleteModalActionCreator,
        closeDeleteModalActionCreator: closeDeleteModalActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookShare));