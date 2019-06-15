import axios from 'axios';

const getNotebooksType = 'GET_NOTEBOOKS';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_TEXTFIELDS';
const createNotebookType = 'CREATE_NOTEBOOK';
const openNotebookModalType = 'OPEN_NOTEBOOK_MODAL'
const closeNotebookModalType = 'OPEN_NOTEBOOK_MODAL'

const initialState = {
    isModalOpen: false,
    notebooks: [],
    notebookForm: {
        name: '',
        public: false
    }
};

export function openNotebookModalActionCreator() {
    return {
        type: openNotebookModalType,
        payload: { isModalOpen: true }
    };
}

export function closeNotebookModalActionCreator() {
    return {
        type: closeNotebookModalType,
        payload: {
            isModalOpen: false,
            notebookForm: {
                name: '',
                public: false
            }
        }
    };
}

export function getNotebooksActionCreator() {
    return function (dispatch) {

        axios.get('https://localhost:44388/api/Notebook').then(function (res) {
            dispatch({
                type: getNotebooksType,
                payload: {
                    notebooks: res.data
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

export function createNotebookActionCreator() {
    return function (dispatch, getState) {
        let notebookFormData = getState().notebook.notebookForm;
        axios.post('https://localhost:44388/api/Notebook', notebookFormData).then(function (res) {
            dispatch(closeNotebookModalActionCreator());
            dispatch(getNotebooksActionCreator());
        });
    }
}

export function deleteNotebookActionCreator(id) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/Notebook/' + id).then(function (res) {
            dispatch(getNotebooksActionCreator());
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebooksType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            notebookForm: {
                ...state.notebookForm,
                ...action.payload
            }
        }
    }
    else if (action.type === openNotebookModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeNotebookModalType) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};