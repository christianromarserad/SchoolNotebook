import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CodeIcon from '@material-ui/icons/Code';
import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Editor } from 'draft-js';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'inherit'
    },
    notesEditorContainer: {
        flex: 1,
        maxHeight: 'inherit'
    },
    toolbar: {
        margin: '10px'
    },
    toolbarButtons: {
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        marginTop: '10px'
    }
};

class NotebookEditor extends Component {

    render() {
        return (
            <div className={this.props.classes.container}>
                <Grid container alignItems="center" className={this.props.classes.toolbar}>
                    {
                        this.props.userCanEdit ?
                            <Grid item lg={6}>
                                <TextField variant="outlined" margin="normal" label="Title" value={this.props.title} onChange={this.props.onChangeTitle} fullWidth name='title' />
                            </Grid> :
                            <Grid item lg={12}>
                                <Typography variant="h5" gutterBottom className={this.props.classes.title}>
                                    {this.props.title}
                                </Typography>
                            </Grid>
                    }

                    {
                        this.props.userCanEdit ?
                            <Grid item lg={6} className={this.props.classes.toolbarButtons}>
                                <Grid item>
                                    <IconButton onMouseDown={this.props.toggleInlineStyle.bind(this, 'BOLD', this.props.editorState)}>
                                        {
                                            this.props.styles.bold ?
                                                <FormatBoldIcon color="primary" /> :
                                                <FormatBoldIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleInlineStyle.bind(this, 'ITALIC', this.props.editorState)}>
                                        {
                                            this.props.styles.italic ?
                                                <FormatItalicIcon color="primary" /> :
                                                <FormatItalicIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleInlineStyle.bind(this, 'UNDERLINE', this.props.editorState)}>
                                        {
                                            this.props.styles.underline ?
                                                <FormatUnderlinedIcon color="primary" /> :
                                                <FormatUnderlinedIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleBlockType.bind(this, 'code-block', this.props.editorState)}>
                                        {
                                            this.props.styles.codeBlock ?
                                                <CodeIcon color="primary" /> :
                                                <CodeIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleBlockType.bind(this, 'blockquote', this.props.editorState)}>
                                        {
                                            this.props.styles.blockquote ?
                                                <FormatQuoteIcon color="primary" /> :
                                                <FormatQuoteIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleBlockType.bind(this, 'unordered-list-item', this.props.editorState)}>
                                        {
                                            this.props.styles.unorderedListItem ?
                                                <FormatListBulletedIcon color="primary" /> :
                                                <FormatListBulletedIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleBlockType.bind(this, 'ordered-list-item', this.props.editorState)}>
                                        {
                                            this.props.styles.orderedListItem ?
                                                <FormatListNumberedIcon color="primary" /> :
                                                <FormatListNumberedIcon />
                                        }
                                    </IconButton>
                                    <IconButton onMouseDown={this.props.toggleBlockType.bind(this, 'header-one', this.props.editorState)}>
                                        {
                                            this.props.styles.headerOne ?
                                                <TitleIcon color="primary" /> :
                                                <TitleIcon />
                                        }
                                    </IconButton>
                                </Grid>
                            </Grid> :
                            null
                    }
                </Grid>
                <Divider />

                {
                    this.props.userCanEdit ?
                        <Editor editorState={this.props.editorState} onChange={this.props.onChangeEditorState} /> :
                        <Editor editorState={this.props.editorState} readOnly />
                }

            </div>
        );
    }
}

export default withStyles(styles)(NotebookEditor);