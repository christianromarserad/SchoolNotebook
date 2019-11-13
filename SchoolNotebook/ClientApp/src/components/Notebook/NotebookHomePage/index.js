// This component is used to render the notebook section of the homepage

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import NotebookItem from '../NotebookItem';
import NotebookCreateDialog from '../NotebookCreateDialog';
import NotebookEditDialog from '../NotebookEditDialog';
import NotebookDeleteDialog from '../NotebookDeleteDialog';
import NotebookItemMenu from '../NotebookItemMenu';
import "react-alice-carousel/lib/alice-carousel.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
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
    updateNotebookActionCreator,
    openDeleteModalActionCreator,
    closeDeleteModalActionCreator
} from '../../../store/Notebook';

const styles = {
    smallMarginLeft: {
        marginLeft: '10px'
    },
    centerSpace: {
        flexGrow: 1
    },
    emptyListMessage: {
        textAlign: 'center'
    }
};


class NotebookHomePage extends Component {
    constructor(props) {
        super(props);
        this.menuItems = this.menuItems.bind(this);
    }

    componentDidMount() {
        this.props.getNotebooksActionCreator();
    }

    openFileExplorer(fileInputId) {
        document.getElementById(fileInputId).click();
    }

    menuItems(notebooks) {
        return (
            notebooks.map((item) => {
                return (
                    <NotebookItem id={item.id} image={item.image} name={item.name} userName={item.userName} ownerUser={item.user} currentUser={this.props.email} averageRate={item.averageRate} numberOfRates={item.numberOfRates} openMenuActionCreator={this.props.openMenuActionCreator} />
                );
            })
        );
    }

    render() {
        const settings = {
            infinite: false,
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
                    <Button color="primary" component={Link} to="/notebook">
                        See All
                        <ChevronRightIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                </Toolbar>

                {
                    this.props.notebooks.length == 0 ?
                        <Typography variant="h5" gutterBottom className={this.props.classes.emptyListMessage}>
                            No Notebooks Available
                        </Typography> :
                        this.props.notebooks.length > 4 ?
                            <Slider {...settings}>
                                {this.menuItems(this.props.notebooks)}
                            </Slider> :
                            <Toolbar>{this.menuItems(this.props.notebooks)}</Toolbar>
                }

                <NotebookItemMenu anchorEl={this.props.anchorEl} isMenuOpen={this.props.isMenuOpen} closeMenuActionCreator={this.props.closeMenuActionCreator} openDeleteModalActionCreator={this.props.openDeleteModalActionCreator} openEditModalActionCreator={this.props.openEditModalActionCreator} selectedNotebookId={this.props.selectedNotebookId} />
                <NotebookCreateDialog isCreateModalOpen={this.props.isCreateModalOpen} closeCreateModalActionCreator={this.props.closeCreateModalActionCreator} name={this.props.name} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} updateImageFileActionCreator={this.props.updateImageFileActionCreator} imageFileName={this.props.imageFileName} createNotebookActionCreator={this.props.createNotebookActionCreator} error={this.props.error} />
                <NotebookEditDialog isEditModalOpen={this.props.isEditModalOpen} closeEditModalActionCreator={this.props.closeEditModalActionCreator} name={this.props.name} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} public={this.props.public} updateSwitchFieldsActionCreator={this.props.updateSwitchFieldsActionCreator} updateImageFileActionCreator={this.props.updateImageFileActionCreator} imageFileName={this.props.imageFileName} updateNotebookActionCreator={this.props.updateNotebookActionCreator} selectedNotebookId={this.props.selectedNotebookId} error={this.props.error} />
                <NotebookDeleteDialog isDeleteModalOpen={this.props.isDeleteModalOpen} closeDeleteModalActionCreator={this.props.closeDeleteModalActionCreator} deleteNotebookActionCreator={this.props.deleteNotebookActionCreator} selectedNotebookId={this.props.selectedNotebookId} />
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
        isDeleteModalOpen: state.homePage.notebook.isDeleteModalOpen,
        name: state.homePage.notebook.notebookForm.name,
        public: state.homePage.notebook.notebookForm.public,
        imageFileName: state.homePage.notebook.notebookForm.imageFileName,
        error: state.homePage.notebook.notebookForm.error,
        email: state.user.email
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
        updateNotebookActionCreator: updateNotebookActionCreator,
        openDeleteModalActionCreator: openDeleteModalActionCreator,
        closeDeleteModalActionCreator: closeDeleteModalActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookHomePage));