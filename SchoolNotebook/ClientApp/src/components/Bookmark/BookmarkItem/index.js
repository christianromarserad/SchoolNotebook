import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import { textAlign } from '@material-ui/system';

const styles = {
    bookmark: {
        "&:hover .moreButton": {
            visibility: 'visible'

        },
        "&:not(:hover) .moreButton": {
            visibility: 'hidden'
        }
    },
    bookmarkTitle: {
        width: '100px',
        maxWidth: '100px',
        textAlign: 'left',
        marginLeft: '10px'
    },
    bookmarkImage: {
        width: "57px",
        height: "57px"
    },
    smallMarginLeft: {
        marginLeft: '10px'
    },
    centerSpace: {
        flexGrow: 1
    }
};

class BookmarkItem extends Component {

    constructor(props) {
        super(props);
        this.getUrlIcon = this.getUrlIcon.bind(this);

        this.state = {
            urlIcon: null
        }
    }

    componentDidMount() {
        this.getUrlIcon(this.props.url);
    }

    openBookmark(url) {
        window.open(url, '_blank');
    }

    getUrlIcon(url) {
        var image = new Image();

        var urlObject = new URL(url);
        var urlIcon = urlObject.protocol + '//' + urlObject.hostname + '/apple-touch-icon.png';

        image.onload = function () {
            this.setState({ urlIcon: urlIcon })
        }.bind(this);

        image.onerror = function () {
            this.setState({ urlIcon: urlObject.protocol + '//' + urlObject.hostname + '/favicon.ico' });
        }.bind(this);

        image.src = urlIcon;
    }

    render() {
        return (
            <Toolbar className={this.props.classes.bookmark}>
                <ButtonBase onClick={this.openBookmark.bind(this, this.props.url)}>
                    <img src={this.state.urlIcon} className={this.props.classes.bookmarkImage} />
                    <Typography variant="caption" display="inline" className={this.props.classes.bookmarkTitle}>
                        {this.props.name}
                    </Typography>
                </ButtonBase>

                <div className="moreButton">
                    <IconButton onClick={this.props.openMenuActionCreator.bind(this, this.props.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                        <MoreVertIcon fontSize="small" aria-haspopup="true" />
                    </IconButton>
                </div>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(BookmarkItem);