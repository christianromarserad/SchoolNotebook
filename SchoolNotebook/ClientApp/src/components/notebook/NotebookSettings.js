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
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    mainContainer: {
        padding: '30px'
    },
    formContainer: {
        padding: '35px'
    },
    formTextField: {
        marginBottom: '30px'
    },
    formSelect: {
        marginBottom: '30px'
    },
    formThumbnail: {
        textAlign: 'center'
    },
    thumbnailHeading: {
        marginBottom: '15px'
    },
    card: {
        maxWidth: 345
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
            <div className={this.props.classes.mainContainer}>
                <Grid container justify="center">
                    <Grid item lg={7}>
                        <Card className={this.props.classes.formContainer}>
                            <Typography variant="h5" gutterBottom>
                                Settings
                            </Typography>

                            <Grid item container spacing={5}>
                                <Grid item lg={6}>
                                    {
                                        this.props.error.Name == null ?
                                            <TextField variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='name' className={this.props.classes.formTextField} /> :
                                            <TextField error helperText={this.props.error.Name[0]} variant="outlined" margin="normal" label="Name" value={this.props.name} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='name' className={this.props.classes.formTextField} /> 
                                    }
                                </Grid>
                                <Grid item lg={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal" className={this.props.classes.formSelect}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Visibility</InputLabel>
                                        <Select
                                            value={this.props.public ? "public" : "private"}
                                            input={<OutlinedInput labelWidth={60} id="outlined-age-native-simple" />}
                                            onChange={this.props.updateSwitchFieldsActionCreator.bind(this, 'public')}
                                        >
                                            <MenuItem key="public" value="public">
                                                public
                                            </MenuItem>
                                            <MenuItem key="private" value="private">
                                                private
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>


                            <div className={this.props.classes.thumbnailHeading}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Thumbnail:
                                </Typography>
                            </div>

                            <Grid item container spacing={5}>
                                <Grid item lg={6}>
                                    <input asp-for="File" type="file" accept="image/*" class="form-control" id="createFileInput" hidden onChange={this.props.updateImageFileActionCreator} />
                                    <Button variant="contained" color="default" onClick={this.openFileExplorer.bind(this, 'createFileInput')}>
                                        Thumbnail
                                    <CloudUploadIcon className={this.props.classes.smallMarginLeft} />
                                    </Button>
                                    <Typography variant="caption" display="inline" className={this.props.classes.smallMarginLeft}>
                                        {this.props.imageFileName}
                                    </Typography>
                                </Grid>

                                <Grid item lg={6}>
                                    <Card className={this.props.classes.card}>
                                        <CardMedia
                                            className={this.props.classes.media}
                                            image={this.props.imageFilePath || '/Images/lizard.jpg'}
                                        />
                                    </Card>
                                </Grid>
                            </Grid>



                            <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.updateNotebookSettingsActionCreator.bind(this, this.props.match.params.id)}>Save</Button>
                        </Card>
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
        imageFilePath: state.notebookPage.notebookSettings.imageFilePath,
        error: state.notebookPage.notebookSettings.error
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