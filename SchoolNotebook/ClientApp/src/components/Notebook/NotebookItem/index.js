// This component is used to render a notebook

import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Ratings from 'react-ratings-declarative';
import "react-alice-carousel/lib/alice-carousel.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

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
    }
};


class NotebookItem extends Component {
    constructor(props) {
        super(props);
        this.openMenu = this.openMenu.bind(this);
    }

    openMenu(id, event) {
        this.props.openMenuActionCreator(id, event);
        event.preventDefault();
    }

    render() {
        return (
            <Card className={this.props.classes.card}>
                <ButtonBase className={this.props.classes.cardActionArea} component={Link} to={"/notebook/content/" + this.props.id}>
                    <CardMedia
                        className={this.props.classes.media}
                        image={this.props.image || '/Images/defaultnotebook.jpg'}
                        title={this.props.name}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item l={10} m={10} s={10} xs={10}>
                                <Typography className={this.props.classes.cardTitle} variant="body2" display="block">
                                    {this.props.name}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {this.props.userName}
                                </Typography>
                                <Ratings rating={this.props.averageRate} widgetDimensions="20px" widgetSpacings="2px">
                                    <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                    <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                    <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                    <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                    <Ratings.Widget widgetDimension="12px" widgetRatedColor="black" />
                                </Ratings>
                                <Typography variant="caption" gutterBottom className={this.props.classes.smallMarginLeft}>
                                    {this.props.averageRate}({this.props.numberOfRates})
                                        </Typography>
                            </Grid>
                            <Grid item l={2} m={2} s={2} xs={2}>
                                {
                                    this.props.ownerUser == this.props.currentUser ?
                                        <IconButton onClick={this.openMenu.bind(this, this.props.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                            <MoreVertIcon style={{ backgroundColor: 'transparent' }} fontSize="small" aria-haspopup="true" />
                                        </IconButton> :
                                        null
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </ButtonBase>
            </Card>
        );
    }
}

export default withStyles(styles)(NotebookItem);