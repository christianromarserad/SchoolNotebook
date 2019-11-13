// This is used to manage the state for bookmark item

import axios from 'axios';

const getBookmarksType = 'GET_BOOKMARKS';
const updateTextFieldsType = 'UPDATE_BOOKMARK_TEXTFIELDS';
const createBookmarkType = 'CREATE_BOOKMARK';
const errorFormModalType = 'ERROR_BOOKMARK_FORM_MODAL';
const openCreateModalType = 'OPEN_CREATE_BOOKMARK_MODAL';
const closeCreateModalType = 'CLOSE_CREATE_BOOKMARK_MODAL';
const openEditModalType = 'OPEN_EDIT_BOOKMARK_MODAL';
const closeEditModalType = 'CLOSE_EDIT_BOOKMARK_MODAL';
const openDeleteModalType = 'OPEN_DELETE_BOOKMARK_MODAL';
const closeDeleteModalType = 'CLOSE_DELETE_BOOKMARK_MODAL';
const openMenuType = 'OPEN_BOOKMARK_MENU';
const closeMenuType = 'CLOSE_BOOKMARK_MENU';

const initialState = {
    isMenuOpen: false,
    anchorEl: null,
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    bookmarks: [],
    selectedBookmarkId: '',
    bookmarkForm: {
        url: '',
        name: '',
        error: {
            Name: null,
            Url: null
        }
    }
};

export function openMenuActionCreator(id, event) {
    return {
        type: openMenuType,
        payload: {
            isMenuOpen: true,
            anchorEl: event.currentTarget,
            selectedBookmarkId: id
        }
    };
}

export function closeMenuActionCreator() {
    return {
        type: closeMenuType,
        payload: {
            isMenuOpen: false,
            selectedBookmarkId: ''
        }
    };
}

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
                url: '',
                name: '',
                error: {
                    Name: null,
                    Url: null
                }
            }
        }
    };
}

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

export function openEditModalActionCreator(id) {
    return function (dispatch) {
        axios.get('api/Bookmark/' + id).then(function (res) {
            dispatch({
                type: openEditModalType,
                payload: {
                    isEditModalOpen: true,
                    bookmarkForm: {
                        url: res.data.url,
                        name: res.data.name,
                        error: {
                            Name: null,
                            Url: null
                        }
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
                url: '',
                name: '',
                error: {
                    Name: null,
                    Url: null
                }
            }
        }
    };
}

export function getBookmarksActionCreator() {
    return function (dispatch) {

        axios.get('api/Bookmark').then(function (res) {
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
        let bookmarkFormData = getState().homePage.bookmark.bookmarkForm;
        axios.post('api/Bookmark', bookmarkFormData).then(function (res) {
            dispatch(closeCreateModalActionCreator());
            dispatch(getBookmarksActionCreator());
        })
        .catch(error => {
            if (error.response.status == 400) {
                dispatch({
                    type: errorFormModalType,
                    payload: {
                        ...error.response.data.errors
                    }
                });
            }
        });
    }
}

export function deleteBookmarkActionCreator(id) {
    return function (dispatch) {
        axios.delete('api/Bookmark/' + id).then(function (res) {
            dispatch(getBookmarksActionCreator());
            dispatch(closeMenuActionCreator());
            dispatch(closeDeleteModalActionCreator());
        });
    }
}

export function updateBookmarkActionCreator(id) {
    return function (dispatch, getState) {
        let bookmarkFormData = getState().homePage.bookmark.bookmarkForm;
        axios.put('api/Bookmark/' + id, bookmarkFormData).then(function (res) {
            dispatch(closeEditModalActionCreator());
            dispatch(closeMenuActionCreator());
            dispatch(getBookmarksActionCreator());
        })
        .catch(error => {
            if (error.response.status == 400) {
                dispatch({
                    type: errorFormModalType,
                    payload: {
                        ...error.response.data.errors
                    }
                });
            }
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
    else if (action.type === openMenuType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeMenuType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === errorFormModalType) {
        return {
            ...state,
            bookmarkForm: {
                ...state.bookmarkForm,
                error: {
                    ...state.bookmarkForm.error,
                    ...action.payload
                }
            }
        };
    }

    return state;
};