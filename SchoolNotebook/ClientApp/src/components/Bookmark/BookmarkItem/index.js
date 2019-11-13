// This component is used to render a bookmark in the application

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/styles';

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