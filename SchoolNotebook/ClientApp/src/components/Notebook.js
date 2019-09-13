import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Ratings from 'react-ratings-declarative';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NotebookContent from './Notebook/NotebookContent';
import NotebookComments from './Notebook/NotebookComments';
import NotebookShare from './Notebook/NotebookShare';
import NotebookSettings from './Notebook/NotebookSettings';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserNotebookPermissionActionCreator } from '../store/UserNotebookPermission';
import {
    getNotebookNameActionCreator,
    getNotebookRatingActionCreator,
    getCurrentUserRateActionCreator,
    rateNotebookActionCreator,
    openRateModalActionCreator,
    closeRateModalActionCreator,
    isNotebookInCollectionActionCreator,
    addToNotebookCollectionActionCreator,
    removeFromNotebookCollectionActionCreator
} from '../store/NotebookNavbar';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '100vh'
    },
    page: {
        flex: 1,
        maxHeight: '100%'
    }
};

class Notebook extends Component {
    componentDidMount() {
        this.props.getNotebookNameActionCreator(this.props.match.params.id);
        this.props.getNotebookRatingActionCreator(this.props.match.params.id);
        this.props.getCurrentUserRateActionCreator(this.props.match.params.id);
        this.props.getUserNotebookPermissionActionCreator(this.props.match.params.id);
        this.props.isNotebookInCollectionActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                <Paper square>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item style={{ flex: 1 }}>
                            <Toolbar>
                                <Typography variant="h5" style={{ marginRight: '110px' }}>
                                    {this.props.notebookName}
                                </Typography>

                                {
                                    this.props.userIsOwner ?
                                        null :
                                        this.props.isNotebookInCollection ?
                                            <Button variant="outlined" style={{ marginRight: '110px' }} onClick={this.props.removeFromNotebookCollectionActionCreator.bind(this, this.props.match.params.id)}>Remove from Collection</Button> :
                                            <Button variant="contained" color="secondary" style={{ marginRight: '110px' }} onClick={this.props.addToNotebookCollectionActionCreator.bind(this, this.props.match.params.id)}>Add to Collection</Button>
                                }

                                <ButtonBase onClick={this.props.openRateModalActionCreator}>
                                    <Ratings rating={this.props.notebookRating} widgetDimensions="40px" widgetSpacings="2px">
                                        <Ratings.Widget widgetDimension="20px" widgetRatedColor="black" />
                                        <Ratings.Widget widgetDimension="20px" widgetRatedColor="black" />
                                        <Ratings.Widget widgetDimension="20px" widgetRatedColor="black" />
                                        <Ratings.Widget widgetDimension="20px" widgetRatedColor="black" />
                                        <Ratings.Widget widgetDimension="20px" widgetRatedColor="black" />
                                    </Ratings>
                                    <Typography variant="body2" gutterBottom display="inline" style={{ marginLeft: '10px' }}>
                                        {this.props.notebookRating}
                                        ({this.props.numberOfRates})
                                    </Typography>
                                </ButtonBase>
                            </Toolbar>
                        </Grid>
                        <Grid item>
                            <Tabs value={this.props.location.pathname} indicatorColor="primary" textColor="primary">
                                <Tab label="Content" component={Link} to={"/notebook/content/" + this.props.match.params.id} value={"/notebook/content/" + this.props.match.params.id} />
                                <Tab label="Comments" component={Link} to={"/notebook/comments/" + this.props.match.params.id} value={"/notebook/comments/" + this.props.match.params.id} />
                                { this.props.userIsOwner ? <Tab label="Share" component={Link} to={"/notebook/share/" + this.props.match.params.id} value={"/notebook/share/" + this.props.match.params.id} /> : null }
                                { this.props.userIsOwner ? <Tab style={{ height: '64px' }} label="Settings" component={Link} to={"/notebook/settings/" + this.props.match.params.id} value={"/notebook/settings/" + this.props.match.params.id} /> : null }
                            </Tabs>
                        </Grid>
                    </Grid>
                </Paper>

                <div className={this.props.classes.page}>
                    <Route exact path='/notebook/content/:id(\d+)' component={NotebookContent} />
                    <Route exact path='/notebook/comments/:id(\d+)' component={NotebookComments} />
                    <Route exact path='/notebook/share/:id(\d+)' component={NotebookShare} />
                    <Route exact path='/notebook/settings/:id(\d+)' component={NotebookSettings} />
                </div>
                
                <Dialog open={this.props.isRateModalOpen} onClose={this.props.closeRateModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Rate Notebook</DialogTitle>
                    <DialogContent>
                        <Ratings changeRating={this.props.rateNotebookActionCreator.bind(this, this.props.match.params.id)} rating={this.props.userRating || 0} widgetDimensions="40px" widgetSpacings="2px">
                            <Ratings.Widget widgetDimension="40px" widgetRatedColor="black" />
                            <Ratings.Widget widgetDimension="40px" widgetRatedColor="black" />
                            <Ratings.Widget widgetDimension="40px" widgetRatedColor="black" />
                            <Ratings.Widget widgetDimension="40px" widgetRatedColor="black" />
                            <Ratings.Widget widgetDimension="40px" widgetRatedColor="black" />
                        </Ratings>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeRateModalActionCreator} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        notebookName: state.notebookPage.notebookNavbar.notebookName,
        notebookRating: state.notebookPage.notebookNavbar.notebookRating,
        numberOfRates: state.notebookPage.notebookNavbar.numberOfRates,
        userRating: state.notebookPage.notebookNavbar.userRating,
        isRateModalOpen: state.notebookPage.notebookNavbar.isRateModalOpen,
        userIsOwner: state.notebookPage.notebookPermission.userIsOwner,
        isNotebookInCollection: state.notebookPage.notebookNavbar.isNotebookInCollection
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookNameActionCreator: getNotebookNameActionCreator,
        getNotebookRatingActionCreator: getNotebookRatingActionCreator,
        getCurrentUserRateActionCreator: getCurrentUserRateActionCreator,
        rateNotebookActionCreator: rateNotebookActionCreator,
        openRateModalActionCreator: openRateModalActionCreator,
        closeRateModalActionCreator: closeRateModalActionCreator,
        getUserNotebookPermissionActionCreator: getUserNotebookPermissionActionCreator,
        isNotebookInCollectionActionCreator: isNotebookInCollectionActionCreator,
        addToNotebookCollectionActionCreator: addToNotebookCollectionActionCreator,
        removeFromNotebookCollectionActionCreator: removeFromNotebookCollectionActionCreator
    }, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Notebook)));