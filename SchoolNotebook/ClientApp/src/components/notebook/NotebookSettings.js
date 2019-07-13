import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookActionCreator,
    updateTextFieldsActionCreator,
    updateNotebookSettingsActionCreator,
    updateSwitchFieldsActionCreator
} from '../../store/NotebookSettings';

class NotebookSettings extends Component {
    componentDidMount() {
        this.props.getNotebookActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item lg={12}>
                        <TextField margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='name' />
                        <FormControlLabel control={<Switch color="primary" checked={this.props.public} onChange={this.props.updateSwitchFieldsActionCreator.bind(this, 'public')} />} label="Public" />
                        <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.updateNotebookSettingsActionCreator.bind(this, this.props.match.params.id)}>Save</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.notebookPage.notebookSettings.name,
        public: state.notebookPage.notebookSettings.public
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookActionCreator: getNotebookActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        updateNotebookSettingsActionCreator: updateNotebookSettingsActionCreator,
        updateSwitchFieldsActionCreator: updateSwitchFieldsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSettings);