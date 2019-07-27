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
import TitleIcon from '@material-ui/icons/Title';
import { Editor, RichUtils } from 'draft-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditorStateActionCreator } from '../../store/NotebookContent';

class NotebookEditor extends Component {
    constructor(props) {
        super(props);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
    }

    toggleInlineStyle(style, event) {
        this.props.updateEditorStateActionCreator(RichUtils.toggleInlineStyle(this.props.editorState, style));
        event.preventDefault();
    }

    toggleBlockType(style, event) {
        this.props.updateEditorStateActionCreator(RichUtils.toggleBlockType(this.props.editorState, style));
        event.preventDefault();
    }

    render() {
        return (
            <Grid item container justify="center" lg={12}>
                {
                    this.props.userCanEdit ?
                        <Grid item>
                            <IconButton onMouseDown={this.toggleInlineStyle.bind(this, 'BOLD')}>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleInlineStyle.bind(this, 'ITALIC')}>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleInlineStyle.bind(this, 'UNDERLINE')}>
                                <FormatUnderlinedIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleBlockType.bind(this, 'code-block')}>
                                <CodeIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleBlockType.bind(this, 'blockquote')}>
                                <FormatQuoteIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleBlockType.bind(this, 'unordered-list-item')}>
                                <FormatListBulletedIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleBlockType.bind(this, 'ordered-list-item')}>
                                <FormatListNumberedIcon />
                            </IconButton>
                            <IconButton onMouseDown={this.toggleBlockType.bind(this, 'header-one')}>
                                <TitleIcon />
                            </IconButton>
                        </Grid> :
                        null
                }
                <Grid item lg={12}>
                    <div style={{ height: '400px', maxHeight: '400px', overflow: 'auto' }}>
                        {
                            this.props.userCanEdit ?
                                <Editor editorState={this.props.editorState} onChange={this.props.updateEditorStateActionCreator} /> :
                                <Editor editorState={this.props.editorState} readOnly />
                        }
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        editorState: state.notebookPage.notebookContent.notebookPage.editorState,
        userCanEdit: state.notebookPage.notebookPermission.userCanEdit
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateEditorStateActionCreator: updateEditorStateActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookEditor);