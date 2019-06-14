import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotebooksActionCreator, closeNotebookModalActionCreator, openNotebookModalActionCreator, createNotebookActionCreator, updateTextFieldsActionCreator } from '../../store/Notebook';

class Bookmark extends Component {

    componentDidMount() {
        this.props.getNotebooksActionCreator();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.openNotebookModalActionCreator}>Create Notebook</Button>
                <div>
                    {this.props.notebooks.map((item) => {
                        return <Button variant="contained" color="default">{item.name}</Button>
                    })}
                </div>
                <Dialog open={this.props.isModalOpen} onClose={this.props.closeNotebookModalActionCreator} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Notebook</DialogTitle>
                    <DialogContent>
                        <TextField margin="normal" label="Name" value={this.props.name} fullWidth onChange={this.props.updateTextFieldsActionCreator} name='name' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeNotebookModalActionCreator} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.createNotebookActionCreator} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notebooks: state.notebook.notebooks,
        isModalOpen: state.notebook.isModalOpen,
        name: state.notebook.notebookForm.name,
        public: state.notebook.notebookForm.public
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNotebooksActionCreator: getNotebooksActionCreator,
        openNotebookModalActionCreator: openNotebookModalActionCreator,
        closeNotebookModalActionCreator: closeNotebookModalActionCreator,
        createNotebookActionCreator: createNotebookActionCreator,
        updateTextFieldsActionCreator: updateTextFieldsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);