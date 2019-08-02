import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookActionCreator,
    updateTextFieldsActionCreator,
    updateNotebookSettingsActionCreator,
    updateSwitchFieldsActionCreator,
    updateImageFileActionCreator
} from '../../store/NotebookSettings';

const styles = {
    card: {
        maxWidth: 345,
        margin: '5px'
    },
    smallMarginLeft: {
        marginLeft: '10px',
    },
    media: {
        height: 200,
    }
};

class NotebookSettings extends Component {
    componentDidMount() {
        this.props.getNotebookActionCreator(this.props.match.params.id);
    }

    openFileExplorer(fileInputId) {
        document.getElementById(fileInputId).click();
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item lg={12}>
                        <TextField margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='name' />
                        <FormControlLabel control={<Switch color="primary" checked={this.props.public} onChange={this.props.updateSwitchFieldsActionCreator.bind(this, 'public')} />} label="Public" />
                        <input asp-for="File" type="file" accept="image/*" class="form-control" id="createFileInput" hidden onChange={this.props.updateImageFileActionCreator} />
                        <Button variant="contained" color="default" onClick={this.openFileExplorer.bind(this, 'createFileInput')}>
                            Thumbnail
                            <CloudUploadIcon className={this.props.classes.smallMarginLeft} />
                        </Button>
                        <Typography variant="caption" display="inline" className={this.props.classes.smallMarginLeft}>
                            {this.props.imageFileName}
                        </Typography>
                        <Card className={this.props.classes.card}>
                            <CardMedia
                                className={this.props.classes.media}
                                image={this.props.imageFilePath || '/Images/lizard.jpg'}
                            />
                        </Card>
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
        public: state.notebookPage.notebookSettings.public,
        imageFileName: state.notebookPage.notebookSettings.imageFileName,
        imageFilePath: state.notebookPage.notebookSettings.imageFilePath
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookActionCreator: getNotebookActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        updateNotebookSettingsActionCreator: updateNotebookSettingsActionCreator,
        updateSwitchFieldsActionCreator: updateSwitchFieldsActionCreator,
        updateImageFileActionCreator: updateImageFileActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookSettings));