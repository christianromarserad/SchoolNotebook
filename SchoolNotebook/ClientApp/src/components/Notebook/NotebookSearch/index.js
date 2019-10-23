import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import Ratings from 'react-ratings-declarative';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchNotebooksActionCreator, updateTextFieldsActionCreator } from '../../../store/NotebookSearch';

const styles = {
    mainContainer: {
        margin: '20px'
    },
    searchBar: {
        marginBottom: '30px'
    },
    searchItemContainer: {
        marginBottom: '15px'
    },
    thumbnail: {
        width: 270,
        height: 152,
        marginRight: '15px'
    },
    buttonBase: {
        display: 'block',
        textAlign: 'initial'
    },
    rating: {
        marginTop: '20px'
    }
};

class NotebookSearch extends Component {

    render() {
        return (
            <div className={this.props.classes.mainContainer}>
                <Grid container>
                    <Grid item lg={12} className={this.props.classes.searchBar}>
                        <TextField
                            variant="outlined"
                            value={this.props.searchKey}
                            margin="normal"
                            label="Search"
                            fullWidth
                            name='searchKey'
                            onChange={this.props.updateTextFieldsActionCreator}
                            onKeyPress={(event) => event.key == 'Enter' ? this.props.searchNotebooksActionCreator(this.props.searchKey) : null}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item container lg={12}>
                        {this.props.notebooks.map((item) => {
                            return (
                                <Grid key={item.id} item lg={12}>
                                    <div className={this.props.classes.searchItemContainer}>
                                        <ButtonBase component={Link} to={"/notebook/content/" + item.id} className={this.props.classes.buttonBase}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div>
                                                    <Card className={this.props.classes.thumbnail}>
                                                        <CardMedia
                                                            className={this.props.classes.thumbnail}
                                                            image={item.image || '/Images/lizard.jpg'}
                                                        />
                                                    </Card>
                                                </div>

                                                <div>
                                                    <Typography variant="h5" display="block">
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" display="block">
                                                        {item.userName}
                                                    </Typography>

                                                    <div className={this.props.classes.rating}>
                                                        <Ratings rating={item.averageRate} widgetDimensions="30px" widgetSpacings="2px">
                                                            <Ratings.Widget widgetDimension="15px" widgetRatedColor="black" />
                                                            <Ratings.Widget widgetDimension="15px" widgetRatedColor="black" />
                                                            <Ratings.Widget widgetDimension="15px" widgetRatedColor="black" />
                                                            <Ratings.Widget widgetDimension="15px" widgetRatedColor="black" />
                                                            <Ratings.Widget widgetDimension="15px" widgetRatedColor="black" />
                                                        </Ratings>
                                                        <Typography variant="caption" gutterBottom className={item.smallMarginLeft}>
                                                            {item.averageRate}({item.numberOfRates})
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </ButtonBase>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        notebooks: state.notebookSearch.notebooks,
        searchKey: state.notebookSearch.searchKey
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchNotebooksActionCreator: searchNotebooksActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookSearch)));