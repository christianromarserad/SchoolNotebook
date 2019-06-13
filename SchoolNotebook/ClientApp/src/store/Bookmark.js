import axios from 'axios';

const getBookmarksType = 'GET_BOOKMARKS';
const updateTextFieldsType = 'UPDATE_BOOKMARK_TEXTFIELDS';
const createBookmarkType = 'CREATE_BOOKMARK';
const openBookmarkModalType = 'OPEN_BOOKMARK_MODAL'
const closeBookmarkModalType = 'OPEN_BOOKMARK_MODAL'

const initialState = {
    isModalOpen: false,
    bookmarks: [],
    bookmarkForm: {
        url: '',
        name: ''
    }
};

export function openBookmarkModalActionCreator() {
    return {
        type: openBookmarkModalType,
        payload: { isModalOpen: true }
    };
}

export function closeBookmarkModalActionCreator() {
    return {
        type: closeBookmarkModalType,
        payload: {
            isModalOpen: false,
            bookmarkForm: {
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
        let bookmarkFormData = getState().bookmark.bookmarkForm;
        axios.post('https://localhost:44388/api/Bookmark', bookmarkFormData).then(function (res) {
            dispatch(getBookmarksActionCreator());
            dispatch(closeBookmarkModalActionCreator());
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
    else if (action.type === openBookmarkModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeBookmarkModalType) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};