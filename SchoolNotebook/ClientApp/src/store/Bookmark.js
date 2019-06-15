﻿import axios from 'axios';

const getBookmarksType = 'GET_BOOKMARKS';
const updateTextFieldsType = 'UPDATE_BOOKMARK_TEXTFIELDS';
const createBookmarkType = 'CREATE_BOOKMARK';
const openCreateModalType = 'OPEN_CREATE_BOOKMARK_MODAL';
const closeCreateModalType = 'OPEN_CREATE_BOOKMARK_MODAL';
const openEditModalType = 'OPEN_EDIT_BOOKMARK_MODAL';
const closeEditModalType = 'OPEN_EDIT_BOOKMARK_MODAL';

const initialState = {
    isCreateModalOpen: false,
    isEditModalOpen: false,
    bookmarks: [],
    bookmarkForm: {
        id: '',
        url: '',
        name: ''
    }
};

export function openCreateModalActionCreator() {
    return {
        type: openCreateModalType,
        payload: { isCreateModalOpen: true }
    };
}

export function closeCreateModalActionCreator() {
    return {
        type: closeCreateModalType,
        payload: {
            isCreateModalOpen: false,
            bookmarkForm: {
                id: '',
                url: '',
                name: ''
            }
        }
    };
}

export function openEditModalActionCreator(id) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Bookmark/' + id).then(function (res) {
            dispatch({
                type: openEditModalType,
                payload: {
                    isEditModalOpen: true,
                    bookmarkForm: {
                        id: res.data.id,
                        url: res.data.url,
                        name: res.data.name
                    }
                }
            });
        });
    }
}

export function closeEditModalActionCreator() {
    return {
        type: closeEditModalType,
        payload: {
            isEditModalOpen: false,
            bookmarkForm: {
                id: '',
                url: '',
                name: ''
            }
        }
    };
}

export function getBookmarksActionCreator() {
    return function (dispatch) {

        axios.get('https://localhost:44388/api/Bookmark').then(function (res) {
            dispatch({
                type: getBookmarksType,
                payload: {
                    bookmarks: res.data
                }
            });
        });
    }
}

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function createBookmarkActionCreator() {
    return function (dispatch, getState) {
        let state = getState();
        let bookmarkFormData = {
            url: state.bookmark.bookmarkForm.url,
            name: state.bookmark.bookmarkForm.name
        }
        axios.post('https://localhost:44388/api/Bookmark', bookmarkFormData).then(function (res) {
            dispatch(closeCreateModalActionCreator());
            dispatch(getBookmarksActionCreator());
        });
    }
}

export function deleteBookmarkActionCreator(id) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/Bookmark/' + id).then(function (res) {
            dispatch(getBookmarksActionCreator());
        });
    }
}

export function updateBookmarkActionCreator() {
    return function (dispatch, getState) {
        let state = getState();
        let bookmarkFormData = {
            url: state.bookmark.bookmarkForm.url,
            name: state.bookmark.bookmarkForm.name
        }
        axios.put('https://localhost:44388/api/Bookmark/' + state.bookmark.bookmarkForm.id, bookmarkFormData).then(function (res) {
            dispatch(closeEditModalActionCreator());
            dispatch(getBookmarksActionCreator());
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getBookmarksType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            bookmarkForm: {
                ...state.bookmarkForm,
                ...action.payload
            }
        }
    }
    else if (action.type === openCreateModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeCreateModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === openEditModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeEditModalType) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};