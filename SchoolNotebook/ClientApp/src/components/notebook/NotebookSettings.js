import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookActionCreator,
    updateTextFieldsActionCreator,
    updateNotebookSettingsActionCreator
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
                        <TextField margin="normal" label="Public" value={this.props.public} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='public' />
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
        updateNotebookSettingsActionCreator: updateNotebookSettingsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSettings);