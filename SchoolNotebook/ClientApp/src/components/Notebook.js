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
import NotebookContent from './notebook/NotebookContent';
import NotebookComments from './notebook/NotebookComments';
import NotebookShare from './notebook/NotebookShare';
import NotebookSettings from './notebook/NotebookSettings';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookNameActionCreator,
    getNotebookRatingActionCreator,
    getCurrentUserRateActionCreator,
    rateNotebookActionCreator,
    openRateModalActionCreator,
    closeRateModalActionCreator
} from '../store/NotebookNavbar';

class Notebook extends Component {
    componentDidMount() {
        this.props.getNotebookNameActionCreator(this.props.match.params.id);
        this.props.getNotebookRatingActionCreator(this.props.match.params.id);
        this.props.getCurrentUserRateActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Paper square>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item style={{ flex: 1 }}>
                            <Toolbar>
                                <Typography variant="h5" style={{ marginRight: '70px' }}>
                                    {this.props.notebookName}
                                </Typography>

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
                                <Tab label="Share" component={Link} to={"/notebook/share/" + this.props.match.params.id} value={"/notebook/share/" + this.props.match.params.id} />
                                <Tab style={{ height: '64px' }} label="Settings" component={Link} to={"/notebook/settings/" + this.props.match.params.id} value={"/notebook/settings/" + this.props.match.params.id} />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Paper>




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



                <Route exact path='/notebook/content/:id(\d+)' component={NotebookContent} />
                <Route exact path='/notebook/comments/:id(\d+)' component={NotebookComments} />
                <Route exact path='/notebook/share/:id(\d+)' component={NotebookShare} />
                <Route exact path='/notebook/settings/:id(\d+)' component={NotebookSettings} />
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
        isRateModalOpen: state.notebookPage.notebookNavbar.isRateModalOpen
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookNameActionCreator: getNotebookNameActionCreator,
        getNotebookRatingActionCreator: getNotebookRatingActionCreator,
        getCurrentUserRateActionCreator: getCurrentUserRateActionCreator,
        rateNotebookActionCreator: rateNotebookActionCreator,
        openRateModalActionCreator: openRateModalActionCreator,
        closeRateModalActionCreator: closeRateModalActionCreator
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notebook));