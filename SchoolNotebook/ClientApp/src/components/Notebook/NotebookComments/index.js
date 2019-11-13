// This component is used to render the comment section of the notebook

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
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import {
    getNotebookCommentsActionCreator,
    createNotebookCommentActionCreator,
    updateTextFieldsActionCreator
} from '../../../store/NotebookComment';

const styles = {
    mainContainer: {
        margin: '20px'
    },
    userName: {
        fontWeight: 'bold',
        marginRight: '15px'
    },
    smallMarginBottom: {
        marginBottom: '5px'
    },
    commentTextEditor: {
        marginBottom: '35px'
    }
};

class NotebookComment extends Component {
    componentDidMount() {
        this.props.getNotebookCommentsActionCreator(this.props.match.params.id);
    }

    render() {
        return (
            <div className={this.props.classes.mainContainer}>
                <Grid container>
                    <Grid item lg={12}>
                        <div className={this.props.classes.commentTextEditor}>
                            <CardHeader
                                avatar={
                                    <Avatar src={this.props.userPicture} />
                                }
                                title={
                                    <TextField variant="outlined" margin="normal" label="Comment" value={this.props.comment} onChange={this.props.updateTextFieldsActionCreator} fullWidth name='comment' multiline />
                                }
                                subheader={
                                    <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={this.props.createNotebookCommentActionCreator.bind(this, this.props.match.params.id)}>Comment</Button>
                                }
                            />
                        </div>
                    </Grid>
                    <Grid item container lg={12}>
                        {this.props.notebookComments.map((item) => {
                            return (
                                <Grid key={item.id} item container lg={12}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt={item.userName} src={item.userPicture} />
                                        }
                                        title={
                                            <div>
                                                <Typography variant="body2" display="inline" className={this.props.classes.userName}>
                                                    {item.userName}
                                                </Typography>
                                                <Typography variant="caption" display="inline" gutterBottom>
                                                    {item.dateFormatted}
                                                </Typography>
                                            </div>
                                        }
                                        subheader={item.comment}
                                    />
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
        comment: state.notebookPage.notebookComment.comment,
        notebookComments: state.notebookPage.notebookComment.notebookComments,
        userPicture: state.user.picture
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebookCommentsActionCreator: getNotebookCommentsActionCreator,
        createNotebookCommentActionCreator: createNotebookCommentActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotebookComment));