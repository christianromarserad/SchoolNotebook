import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getNotebookCommentsActionCreator,
    createNotebookCommentActionCreator,
    updateTextFieldsActionCreator
} from '../../store/NotebookComment';

class NotebookComment extends Component {
    componentDidMount() {
        this.props.getNotebookCommentsActionCreator();
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item lg={12}>
                        <TextField margin="normal" label="Comment" value={this.props.comment} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='comment' />
                        <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.createNotebookCommentActionCreator}>Comment</Button>
                    </Grid>
                    <Grid item container lg={12}>
                        {this.props.notebookComments.map((item) => {
                            return (
                                <Grid key={item.id} item lg={12}>
                                    <Card style={{ margin: '5px' }}>
                                        <Toolbar>
                                            <Typography style={{ flexGrow: 1 }}>
                                                {item.comment}
                                            </Typography>
                                            <Typography>
                                                {item.user}
                                            </Typography>
                                        </Toolbar>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        comment: state.notebookComment.comment,
        notebookComments: state.notebookComment.notebookComments
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookCommentsActionCreator: getNotebookCommentsActionCreator,
        createNotebookCommentActionCreator: createNotebookCommentActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookComment);