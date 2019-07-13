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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookPermissionsActionCreator,
    updateTextFieldsActionCreator,
    updateSwitchFieldsActionCreator,
    openCreateModalActionCreator,
    closeCreateModalActionCreator,
    createNotebookPermissionActionCreator,
    updateCanEditPermissionActionCreator
} from '../../store/NotebookShare';

class NotebookShare extends Component {
    componentDidMount() {
        this.props.getNotebookPermissionsActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.openCreateModalActionCreator}>Add Permission</Button>
                    <Grid item container lg={12}>
                        {this.props.notebookPermissions.map((item) => {
                            return (
                                <Grid key={item.user} item lg={12}>
                                    <Card style={{ margin: '5px' }}>
                                        <Toolbar>
                                            <Typography style={{ flexGrow: 1 }}>
                                                {item.user}
                                            </Typography>
                                            <FormControlLabel control={<Switch color="primary" checked={item.canEdit} onChange={this.props.updateCanEditPermissionActionCreator.bind(this, item)} />} label="Can Edit" />
                                        </Toolbar>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>

                <Dialog open={this.props.isCreateModalOpen} onClose={this.props.closeCreateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Bookmark</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="User" value={this.props.user} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='user' />
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.notebookPage.notebookShare.notebookShareForm.user,
        canEdit: state.notebookPage.notebookShare.notebookShareForm.canEdit,
        notebookPermissions: state.notebookPage.notebookShare.notebookPermissions,
        isCreateModalOpen: state.notebookPage.notebookShare.isCreateModalOpen
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
        updateCanEditPermissionActionCreator: updateCanEditPermissionActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShare);