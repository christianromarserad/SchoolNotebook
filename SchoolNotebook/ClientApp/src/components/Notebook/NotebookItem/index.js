import React, { Component } from 'react';
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
                        image={this.props.image || '/Images/lizard.jpg'}
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
                                <IconButton onClick={this.openMenu.bind(this, this.props.id)} aria-label="More" aria-controls="long-menu" aria-haspopup="true">
                                    <MoreVertIcon style={{ backgroundColor: 'transparent' }} fontSize="small" aria-haspopup="true" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </ButtonBase>
            </Card>
        );
    }
}

export default withStyles(styles)(NotebookItem);