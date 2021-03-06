﻿// This component is used to display the bookmark section in the homepage which you can view, delete, and edit the bookmark

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import BookmarkItem from '../BookmarkItem';
import BookmarkCreateDialog from '../BookmarkCreateDialog';
import BookmarkEditDialog from '../BookmarkEditDialog';
import BookmarkDeleteDialog from '../BookmarkDeleteDialog';
import BookmarkItemMenu from '../BookmarkItemMenu';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import {
    getBookmarksActionCreator,
    closeCreateModalActionCreator,
    openCreateModalActionCreator,
    createBookmarkActionCreator,
    updateTextFieldsActionCreator,
    deleteBookmarkActionCreator,
    openEditModalActionCreator,
    closeEditModalActionCreator,
    openMenuActionCreator,
    closeMenuActionCreator,
    updateBookmarkActionCreator,
    openDeleteModalActionCreator,
    closeDeleteModalActionCreator
} from '../../../store/Bookmark';
import { textAlign, maxHeight } from '@material-ui/system';

const styles = {
    smallMarginLeft: {
        marginLeft: '10px'
    },
    title: {
        flexGrow: 1
    },
    emptyListMessage: {
        textAlign: 'center'
    }
};

class BookmarkHomePage extends Component {
    constructor(props) {
        super(props);

        this.menuItems = this.menuItems.bind(this);
    }

    componentDidMount() {
        this.props.getBookmarksActionCreator();
    }

    menuItems(bookmarks) {
        return (
            bookmarks.map((item) => {
                return (
                    <BookmarkItem key={item.id + item.url + item.name} name={item.name} url={item.url} id={item.id} openMenuActionCreator={this.props.openMenuActionCreator} />
                )
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
            slidesToScroll: 1,
            rows: 1
        };

        return (
            <div>
                <Divider />
                <Toolbar>
                    <Typography variant="h6" gutterBottom className={this.props.classes.title}>
                        Bookmarks
                    </Typography>
                    <Button color="primary" onClick={this.props.openCreateModalActionCreator}>
                        Add
                        <AddIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                    <Button color="primary" component={Link} to="/bookmark">
                        See All
                        <ChevronRightIcon className={this.props.classes.smallMarginLeft} />
                    </Button>
                </Toolbar>

                {
                    this.props.bookmarks.length == 0 ?
                        <Typography variant="h5" gutterBottom className={this.props.classes.emptyListMessage}>
                            No Bookmarks Available
                        </Typography> :
                        this.props.bookmarks.length > 4 ?
                            <Slider {...settings}>
                                {this.menuItems(this.props.bookmarks)}
                            </Slider> :
                            <Toolbar>{this.menuItems(this.props.bookmarks)}</Toolbar>
                }

                <BookmarkItemMenu anchorEl={this.props.anchorEl} isMenuOpen={this.props.isMenuOpen} closeMenuActionCreator={this.props.closeMenuActionCreator} openDeleteModalActionCreator={this.props.openDeleteModalActionCreator} selectedBookmarkId={this.props.selectedBookmarkId} openEditModalActionCreator={this.props.openEditModalActionCreator} />
                <BookmarkCreateDialog isCreateModalOpen={this.props.isCreateModalOpen} closeCreateModalActionCreator={this.props.closeCreateModalActionCreator} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} createBookmarkActionCreator={this.props.createBookmarkActionCreator} error={this.props.error} />
                <BookmarkEditDialog isEditModalOpen={this.props.isEditModalOpen} closeEditModalActionCreator={this.props.closeEditModalActionCreator} updateTextFieldsActionCreator={this.props.updateTextFieldsActionCreator} updateBookmarkActionCreator={this.props.updateBookmarkActionCreator} url={this.props.url} name={this.props.name} selectedBookmarkId={this.props.selectedBookmarkId} error={this.props.error} />
                <BookmarkDeleteDialog isDeleteModalOpen={this.props.isDeleteModalOpen} closeDeleteModalActionCreator={this.props.closeDeleteModalActionCreator} deleteBookmarkActionCreator={this.props.deleteBookmarkActionCreator} selectedBookmarkId={this.props.selectedBookmarkId} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookmarks: state.homePage.bookmark.bookmarks,
        isCreateModalOpen: state.homePage.bookmark.isCreateModalOpen,
        isEditModalOpen: state.homePage.bookmark.isEditModalOpen,
        isDeleteModalOpen: state.homePage.bookmark.isDeleteModalOpen,
        isMenuOpen: state.homePage.bookmark.isMenuOpen,
        anchorEl: state.homePage.bookmark.anchorEl,
        selectedBookmarkId: state.homePage.bookmark.selectedBookmarkId,
        url: state.homePage.bookmark.bookmarkForm.url,
        name: state.homePage.bookmark.bookmarkForm.name,
        error: state.homePage.bookmark.bookmarkForm.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBookmarksActionCreator: getBookmarksActionCreator,
        openCreateModalActionCreator: openCreateModalActionCreator,
        closeCreateModalActionCreator: closeCreateModalActionCreator,
        createBookmarkActionCreator: createBookmarkActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator,
        deleteBookmarkActionCreator: deleteBookmarkActionCreator,
        openEditModalActionCreator: openEditModalActionCreator,
        closeEditModalActionCreator: closeEditModalActionCreator,
        openDeleteModalActionCreator: openDeleteModalActionCreator,
        closeDeleteModalActionCreator: closeDeleteModalActionCreator,
        updateBookmarkActionCreator: updateBookmarkActionCreator,
        openMenuActionCreator: openMenuActionCreator,
        closeMenuActionCreator: closeMenuActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BookmarkHomePage));