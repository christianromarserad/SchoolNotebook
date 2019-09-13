import React, { Component } from 'react';
import NavMenu from './NavMenu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';
import NoteIcon from '@material-ui/icons/Note';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import { Container } from 'reactstrap';
import { logoutActionCreator } from '../store/User'

const styles = {
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    listItem: {
        width: 55,
        overflow: 'hidden'
    },
    content: {
        marginLeft: 55
    }
};

class Layout extends Component {
    render() {
        return (
            <div>
                <Drawer
                    variant="permanent"
                    position="fixed"
                    className={this.props.classes.drawer}
                >
                    <List>
                        <ListItem button className={this.props.classes.listItem} component={Link} to="/">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                        </ListItem>
                        <ListItem button className={this.props.classes.listItem} component={Link} to={"/notebookSearch/" + this.props.searchKey}>
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                        </ListItem>
                        <ListItem button className={this.props.classes.listItem}>
                            <ListItemIcon><BookmarksIcon /></ListItemIcon>
                        </ListItem>
                        <ListItem button className={this.props.classes.listItem}>
                            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        </ListItem>
                        <ListItem button className={this.props.classes.listItem}>
                            <ListItemIcon><NoteIcon /></ListItemIcon>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button className={this.props.classes.listItem} onClick={this.props.logout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        </ListItem>
                    </List>
                </Drawer>
                <Container className={this.props.classes.content}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchKey: state.notebookSearch.searchKey
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout: logoutActionCreator }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Layout));
