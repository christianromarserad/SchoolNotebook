import axios from 'axios';

const getNotebookCommentsType = 'GET_NOTEBOOK_COMMENTS';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_COMMENT_TEXTFIELDS';


const initialState = {
    notebookComments: [],
    comment: ''
};

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function getNotebookCommentsActionCreator() {
    return function (dispatch, getState) {
        let notebookId = getState().notebookPage.notebookId;
        axios.get('https://localhost:44388/api/NotebookComment?notebookId=' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookCommentsType,
                payload: {
                    notebookComments: res.data
                }
            });
        });
    }
}

export function createNotebookCommentActionCreator() {
    return function (dispatch, getState) {
        let state = getState();
        let notebookCommentFormData = {
            notebookId: state.notebookPage.notebookId,
            comment: state.notebookComment.comment
        };
        axios.post('https://localhost:44388/api/NotebookComment', notebookCommentFormData).then(function (res) {
            dispatch(getNotebookCommentsActionCreator());
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebookCommentsType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};