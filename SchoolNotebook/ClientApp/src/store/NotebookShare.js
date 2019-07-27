import axios from 'axios';

const getNotebookPermissionsType = 'GET_NOTEBOOK_PERMISSIONS';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_SHARE_TEXTFIELDS';
const updateSwitchFieldsType = 'UPDATE_NOTEBOOK_SHARE_SWITCHFIELDS';
const openCreateModalType = 'OPEN_CREATE_NOTEBOOK_SHARE_MODAL';
const closeCreateModalType = 'CLOSE_CREATE_NOTEBOOK_SHARE_MODAL';


const initialState = {
    isCreateModalOpen: false,
    notebookPermissions: [],
    notebookShareForm: {
        user: null,
        canEdit: false
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
            notebookShareForm: {
                user: null,
                canEdit: false
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

export function updateSwitchFieldsActionCreator(name, event) {
    return {
        type: updateSwitchFieldsType,
        payload: { [name]: event.target.checked }
    };
}

export function getNotebookPermissionsActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookShare/' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookPermissionsType,
                payload: {
                    notebookPermissions: res.data
                }
            });
        });
    }
}

export function updateCanEditPermissionActionCreator({ notebookId, user }, event) {
    return function (dispatch, getState) {
        let state = getState();
        let notebookShareFormData = {
            notebookId: notebookId,
            user: user,
            canEdit: event.target.checked
        };
        axios.put('https://localhost:44388/api/NotebookShare', notebookShareFormData).then(function (res) {
            dispatch(getNotebookPermissionsActionCreator(notebookId));
        });
    }
}

export function createNotebookPermissionActionCreator(notebookId) {
    return function (dispatch, getState) {
        let state = getState();
        let notebookShareFormData = {
            notebookId: notebookId,
            ...state.notebookPage.notebookShare.notebookShareForm
        };
        axios.post('https://localhost:44388/api/NotebookShare', notebookShareFormData).then(function (res) {
            dispatch(closeCreateModalActionCreator());
            dispatch(getNotebookPermissionsActionCreator(notebookId));
        });
    }
}

export function deleteNotebookPermissionActionCreator(notebookId, user) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/NotebookShare?notebookId=' + notebookId + '&user=' + user).then(function (res) {
            dispatch(getNotebookPermissionsActionCreator(notebookId));
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebookPermissionsType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            notebookShareForm: {
                ...state.notebookShareForm,
                ...action.payload
            }
        }
    }
    else if (action.type === updateSwitchFieldsType) {
        return {
            ...state,
            notebookShareForm: {
                ...state.notebookShareForm,
                ...action.payload
            }
        }
    }
    else if (action.type === openCreateModalType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === closeCreateModalType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};