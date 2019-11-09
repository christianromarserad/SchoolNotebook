import axios from 'axios';
import {
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';

const updateTextFieldsType = 'UPDATE_NOTEBOOK_PAGE_TEXTFIELDS';
const getNotebookPagesType = 'GET_NOTEBOOK_PAGES';
const getNotebookPageType = 'GET_NOTEBOOK_PAGE';
const getDefaultNotebookPageType = 'GET_DEFAULT_NOTEBOOK_PAGE';
const createNotebookPageType = 'CREATE_NOTEBOOK_PAGE';
const updateNotebookPageType = 'UPDATE_NOTEBOOK_PAGE';
const updateEditorStateType = 'UPDATE_EDITOR_STATE';
const openDeleteModalType = 'OPEN_DELETE_NOTEBOOK_PAGE_MODAL';
const closeDeleteModalType = 'CLOSE_DELETE_NOTEBOOK_PAGE_MODAL';

const initialState = {
    isDeleteModalOpen: false,
    notebookPages: [],
    notebookPage: {
        notebookId: null,
        title: null,
        pageNumber: null,
        editorState: EditorState.createEmpty(),
        styles: {
            bold: false,
            italic: false,
            underline: false,
            codeBlock: false,
            blockquote: false,
            unorderedListItem: false,
            orderedListItem: false,
            headerOne: false
        }
    },
};

export function openDeleteModalActionCreator() {
    return {
        type: openDeleteModalType,
        payload: { isDeleteModalOpen: true }
    };
}

export function closeDeleteModalActionCreator() {
    return {
        type: closeDeleteModalType,
        payload: { isDeleteModalOpen: false }
    };
}

export function updateEditorStateActionCreator(editorState) {
    let selection = editorState.getSelection();
    let blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return {
        type: updateEditorStateType,
        payload: {
            editorState: editorState,
            styles: {
                bold: editorState.getCurrentInlineStyle().has('BOLD'),
                italic: editorState.getCurrentInlineStyle().has('ITALIC'),
                underline: editorState.getCurrentInlineStyle().has('UNDERLINE'),
                codeBlock: 'code-block' == blockType,
                blockquote: 'blockquote' == blockType,
                unorderedListItem: 'unordered-list-item' == blockType,
                orderedListItem: 'ordered-list-item' == blockType,
                headerOne: 'header-one' == blockType
            }
        }
    };
}

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function getNotebookPagesActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('api/NotebookPage/' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookPagesType,
                payload: {
                    notebookPages: res.data
                }
            });
        });
    }
}

export function getNotebookPageActionCreator(notebookId, pageNumber) {
    return function (dispatch) {
        axios.get('api/NotebookPage?notebookId=' + notebookId + '&pageNumber=' + pageNumber).then(function (res) {
            dispatch({
                type: getNotebookPageType,
                payload: {
                    notebookPage: {
                        notebookId: res.data.notebookId,
                        title: res.data.title,
                        pageNumber: res.data.pageNumber,
                        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
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
                notebookId: null,
                title: '',
                pageNumber: '',
                editorState: EditorState.createEmpty()
            }
        }
    };
}

export function createNotebookPageActionCreator(notebookId) {
    return function (dispatch, getState) {
        let notebookPageFormData = {
            notebookId: notebookId,
            title: 'untitled',
            content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
        };
        console.log(notebookId);
        axios.post('api/NotebookPage', notebookPageFormData).then(function (res) {
            dispatch({
                type: createNotebookPageType,
                payload: {
                    notebookPage: {
                        notebookId: res.data.notebookId,
                        title: res.data.title,
                        pageNumber: res.data.pageNumber,
                        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content)))
                    }
                }
            });
            dispatch(getNotebookPagesActionCreator(res.data.notebookId));
        });
    }
}

export function updateNotebookPageActionCreator(notebookId) {
    return function (dispatch, getState) {
        let state = getState();
        let notebookPageFormData = {
            notebookId: notebookId,
            title: state.notebookPage.notebookContent.notebookPage.title,
            pageNumber: state.notebookPage.notebookContent.notebookPage.pageNumber,
            content: JSON.stringify(convertToRaw(state.notebookPage.notebookContent.notebookPage.editorState.getCurrentContent()))
        }
        axios.put('api/NotebookPage/', notebookPageFormData).then(function (res) {
            dispatch(getNotebookPagesActionCreator(res.data.notebookId));
        });
    }
}

export function deleteNotebookPageActionCreator(notebookId, pageNumber) {
    return function (dispatch, getState) {
        axios.delete('api/NotebookPage?notebookId=' + notebookId + '&pageNumber=' + pageNumber).then(function (res) {
            dispatch(getNotebookPagesActionCreator(notebookId));
            if (pageNumber == getState().notebookPage.notebookContent.notebookPage.pageNumber) {
                dispatch(getDefaultNotebookPageActionCreator(notebookId));
            }
            dispatch(closeDeleteModalActionCreator());
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
            notebookPage: {
                ...state.notebookPage,
                ...action.payload.notebookPage
            }
        }
    }
    else if (action.type === getDefaultNotebookPageType) {
        return {
            ...state,
            notebookPage: {
                ...state.notebookPage,
                ...action.payload.notebookPage
            }
        }
    }
    else if (action.type === createNotebookPageType) {
        return {
            ...state,
            notebookPage: {
                ...state.notebookPage,
                ...action.payload.notebookPage
            }
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
    else if (action.type === updateEditorStateType) {
        return {
            ...state,
            notebookPage: {
                ...state.notebookPage,
                ...action.payload
            }
        }
    }
    else if (action.type === openDeleteModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeDeleteModalType) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};