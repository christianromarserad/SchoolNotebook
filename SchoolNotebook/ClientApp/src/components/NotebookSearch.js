import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchNotebooksActionCreator } from '../store/NotebookSearch';

class NotebookSearch extends Component {
    componentDidMount() {
        this.props.searchNotebooksActionCreator(this.props.match.params.searchKey);
    }

    componentWillReceiveProps(props) {
        if (this.props.match.params.searchKey != props.match.params.searchKey) {
            this.props.searchNotebooksActionCreator(props.match.params.searchKey);
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item container lg={12}>
                        {this.props.notebooks.map((item) => {
                            return (
                                <Grid key={item.id} item lg={12}>
                                    <Card style={{ margin: '5px' }}>
                                        <CardActionArea centerRipple='true' disableRipple='true' component={Link} to={"/notebook/content/" + item.id}>
                                            <Toolbar>
                                                <Typography style={{ flexGrow: 1 }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography>
                                                    {item.user}
                                                </Typography>
                                            </Toolbar>
                                        </CardActionArea>
                                    </Card>
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
        notebooks: state.notebookSearch.notebooks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchNotebooksActionCreator: searchNotebooksActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSearch);