import axios from 'axios';

const getUserNotebookPermissionType = 'GET_USER_NOTEBOOK_PERMISSION';


const initialState = {
    userIsOwner: false,
    userCanView: false,
    userCanEdit: false
};

export function getUserNotebookPermissionActionCreator(notebookId) {
    return function (dispatch, getState) {
        axios.get('api/Notebook/' + notebookId).then(function (notebook) {

            if (notebook.data.user == getState().user.email) {
                dispatch({
                    type: getUserNotebookPermissionType,
                    payload: {
                        userIsOwner: true,
                        userCanView: true,
                        userCanEdit: true
                    }
                });
            }
            else {
                axios.get('api/NotebookShare/GetCurrentUserPermission/' + notebookId).then(function (res) {
                    dispatch({
                        type: getUserNotebookPermissionType,
                        payload: {
                            userIsOwner: false,
                            userCanView: true,
                            userCanEdit: res.data.canEdit
                        }
                    })
                }).catch(function (error) {
                    dispatch({
                        type: getUserNotebookPermissionType,
                        payload: {
                            userIsOwner: false,
                            userCanView: notebook.data.public,
                            userCanEdit: false
                        }
                    })
                });
            }
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getUserNotebookPermissionType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};