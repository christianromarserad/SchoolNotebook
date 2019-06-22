﻿import axios from 'axios';

const updateTextFieldsType = 'UPDATE_NOTEBOOK_PAGE_TEXTFIELDS';
const getNotebookPagesType = 'GET_NOTEBOOK_PAGES';
const getNotebookPageType = 'GET_NOTEBOOK_PAGE';
const getDefaultNotebookPageType = 'GET_DEFAULT_NOTEBOOK_PAGE';
const createNotebookPageType = 'CREATE_NOTEBOOK_PAGE';
const updateNotebookPageType = 'UPDATE_NOTEBOOK_PAGE';

const initialState = {
    notebookId: null,
    notebookPages: [],
    notebookPage: {
        title: null,
        pageNumber: null,
        notes: null
    },
};

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function getNotebookPagesActionCreator(id) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookPage/' + id).then(function (res) {
            dispatch({
                type: getNotebookPagesType,
                payload: {
                    notebookId: id,
                    notebookPages: res.data
                }
            });
        });
    }
}

export function getNotebookPageActionCreator(notebookId, pageNumber) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookPage?notebookId=' + notebookId + '&pageNumber=' + pageNumber).then(function (res) {
            dispatch({
                type: getNotebookPageType,
                payload: {
                    notebookPage: {
                        title: res.data.title,
                        pageNumber: res.data.pageNumber,
                        notes: res.data.notes
                    }
                }
            });
        });
    }
}

export function getDefaultNotebookPageActionCreator(notebookId) {
    return {
        type: getDefaultNotebookPageType,
        payload: {
            notebookPage: {
                title: null,
                pageNumber: null,
                notes: null
            }
        }
    };
}

export function createNotebookPageActionCreator() {
    return function (dispatch, getState) {
        let notebookPageFormData = {
            notebookId: getState().notebookContent.notebookId,
            title: 'untitled',
            notes: 'Put your notes in here',
        };
        axios.post('https://localhost:44388/api/NotebookPage', notebookPageFormData).then(function (res) {
            dispatch({
                type: createNotebookPageType,
                payload: {
                    notebookPage: {
                        title: res.data.title,
                        pageNumber: res.data.pageNumber,
                        notes: res.data.notes
                    }
                }
            });
            dispatch(getNotebookPagesActionCreator(res.data.notebookId));
        });
    }
}

export function updateNotebookPageActionCreator() {
    return function (dispatch, getState) {
        let state = getState();
        let notebookId = state.notebookContent.notebookId;
        let notebookPageFormData = {
            notebookId: notebookId,
            ...state.notebookContent.notebookPage
        }
        console.log(notebookPageFormData);
        axios.put('https://localhost:44388/api/NotebookPage/', notebookPageFormData).then(function (res) {
            dispatch({
                type: updateNotebookPageType,
                payload: {
                    notebookPage: {
                        title: res.data.title,
                        pageNumber: res.data.pageNumber,
                        notes: res.data.notes
                    }
                }
            });
            dispatch(getNotebookPagesActionCreator(res.data.notebookId));
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebookPagesType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === getNotebookPageType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === getDefaultNotebookPageType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === createNotebookPageType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateNotebookPageType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            notebookPage: {
                ...state.notebookPage,
                ...action.payload
            }
        }
    }

    return state;
};