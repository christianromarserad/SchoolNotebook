// This is used to manage the state of the notebook comment page

import axios from 'axios';

const getNotebookCommentsType = 'GET_NOTEBOOK_COMMENTS';
const createNotebookCommentType = 'CREATE_NOTEBOOK_COMMENT';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_COMMENT_TEXTFIELDS';
const errorFormType = 'ERROR_FORM_COMMENT';


const initialState = {
    notebookComments: [],
    comment: '',
    error: {
        Comment: null
    }
};

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function getNotebookCommentsActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('api/NotebookComment?notebookId=' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookCommentsType,
                payload: {
                    notebookComments: res.data
                }
            });
        });
    }
}

export function createNotebookCommentActionCreator(notebookId) {
    return function (dispatch, getState) {
        let state = getState();
        let notebookCommentFormData = {
            notebookId: notebookId,
            comment: state.notebookPage.notebookComment.comment
        };
        axios.post('api/NotebookComment', notebookCommentFormData).then(function (res) {
            dispatch({
                type: createNotebookCommentType,
                payload: {
                    comment: '',
                    error: {
                        Comment: null
                    }
                }
            });
            dispatch(getNotebookCommentsActionCreator(notebookId));
        }).catch(error => {
            if (error.response.status == 400) {
                dispatch({
                    type: errorFormType,
                    payload: {
                        ...error.response.data.errors
                    }
                });
            }
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
    else if (action.type === createNotebookCommentType) {
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
    else if (action.type === errorFormType) {
        return {
            ...state,
            error: {
                ...state.error,
                ...action.payload
            }
        }
    }

    return state;
};