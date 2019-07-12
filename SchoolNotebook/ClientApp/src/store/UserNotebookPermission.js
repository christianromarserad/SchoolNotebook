import axios from 'axios';

const getUserNotebookPermissionType = 'GET_USER_NOTEBOOK_PERMISSION';


const initialState = {
    isOwner: false,
    canView: false,
    canEdit: false
};

export function getUserNotebookPermissionActionCreator(notebookId) {
    return function (dispatch, getState) {
        axios.get('https://localhost:44388/api/Notebook/' + notebookId).then(function (res) {
            if (res.data.user == getState().user.email) {
                dispatch({
                    type: getUserNotebookPermissionType,
                    payload: {
                        isOwner: true,
                        canView: true,
                        canEdit: true
                    }
                });
            }
            else {
                axios.get('https://localhost:44388/api/NotebookShare/' + notebookId).then(function (res) {
                    dispatch({
                        type: getUserNotebookPermissionType,
                        payload: {
                            canView: true,
                            canEdit: res.data.canEdit
                        }
                    })
                }).catch(function (error) {
                    //TODO (redirect to homepage)
                    console.log(error);
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