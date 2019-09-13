﻿import React, { Component } from 'react';
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

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        maxWidth: 250,
        width: 250,
        margin: 5
    },
    media: {
        height: 140
    },
    cardTitleContainer: {
        marginTop: 7,
        marginBottom: 7,
        display: 'flex'
    },
    cardTitle: {
        fontWeight: 'bold'
    },
    cardActionArea: {
        display: 'block',
        textAlign: 'initial'
    },
    smallMarginLeft: {
        marginLeft: '10px'
    },
    centerSpace: {
        flexGrow: 1
    }
};


class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.openMenu = this.openMenu.bind(this);
        this.menuItems = this.menuItems.bind(this);
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

    menuItems(notebooks) {
        return (
            notebooks.map((item) => {
                return (
                    <Card className={this.props.classes.card}>
                        <ButtonBase className={this.props.classes.cardActionArea} component={Link} to={"/notebook/content/" + item.id}>
                            <CardMedia
                                className={this.props.classes.media}
                                image={item.image || '/Images/lizard.jpg'}
                                title={item.Name}
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item l={10} m={10} s={10} xs={10}>
                                        <Typography className={this.props.classes.cardTitle} variant="body2" display="block">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Christian Serad
                                        </Typography>
                                        <Ratings rating={item.averageRate} widgetDimensions="20px" widgetSpacings="2px">
                                            <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                            <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                            <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                            <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                            <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                        </Ratings>
                                        <Typography variant="caption" gutterBottom className={this.props.classes.smallMarginLeft}>
                                            {item.averageRate}({item.numberOfRates})
                                        </Typography>
                                    </Grid>
                                    <Grid item l={2} m={2} s={2} xs={2}>
                                        <IconButton onClick={this.openMenu.bind(this, item.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                            <MoreVertIcon style={{ backgroundColor: 'transparent' }} fontSize="small" aria-haspopup="true" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </ButtonBase>
                    </Card>
                );
            })
        );
    }

    render() {
        const settings = {
            infinite: true,
            accessibility: true,
            arrows: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1
        };

        return (
            <div>
                <Divider />
                <Toolbar>
                    <Typography variant="h6" gutterBottom>
                        Notebooks
                    </Typography>
                    <div className={this.props.classes.centerSpace}></div>
                    <Button color="primary" onClick={this.props.openCreateModalActionCreator}>
                        Add
                        <AddIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                    <Button color="primary">
                        See All
                        <ChevronRightIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                </Toolbar>

                <Slider {...settings}>
                    {this.menuItems(this.props.notebooks)}
                </Slider>


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