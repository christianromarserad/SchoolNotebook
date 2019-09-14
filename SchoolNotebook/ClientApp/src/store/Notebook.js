import axios from 'axios';

const getNotebooksType = 'GET_NOTEBOOKS';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_TEXTFIELDS';
const updateSwitchFieldsType = 'UPDATE_NOTEBOOK_HOMEPAGE_SWITCHFIELDS';
const updateImageFileType = 'UPDATE_NOTEBOOK_HOMEPAGE_IMAGE_FILE';
const createNotebookType = 'CREATE_NOTEBOOK';
const errorFormModalType = 'ERROR_NOTEBOOK_FORM_MODAL';
const openCreateModalType = 'OPEN_CREATE_NOTEBOOK_MODAL';
const closeCreateModalType = 'CLOSE_CREATE_NOTEBOOK_MODAL';
const openEditModalType = 'OPEN_EDIT_NOTEBOOK_MODAL';
const closeEditModalType = 'CLOSE_EDIT_NOTEBOOK_MODAL';
const openMenuType = 'OPEN_NOTEBOOK_MENU';
const closeMenuType = 'CLOSE_NOTEBOOK_MENU';

const initialState = {
    isMenuOpen: false,
    anchorEl: null,
    isCreateModalOpen: false,
    isEditModalOpen: false,
    notebooks: [],
    selectedNotebookId: '',
    notebookForm: {
        name: '',
        public: false,
        imageFile: null,
        imageFileName: null,
        error: {
            Name: null
        }
    }
};

export function openMenuActionCreator(id, event) {
    return {
        type: openMenuType,
        payload: {
            isMenuOpen: true,
            anchorEl: event.currentTarget,
            selectedNotebookId: id
        }
    };
}

export function closeMenuActionCreator() {
    return {
        type: closeMenuType,
        payload: {
            isMenuOpen: false,
            selectedNotebookId: ''
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
            notebookForm: {
                name: '',
                public: false,
                error: {
                    Name: null
                }
            }
        }
    };
}

export function openEditModalActionCreator(id) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/' + id).then(function (res) {
            dispatch({
                type: openEditModalType,
                payload: {
                    isEditModalOpen: true,
                    notebookForm: {
                        name: res.data.name,
                        public: res.data.public,
                        imageFileName: res.data.imageName,
                        error: {
                            Name: null
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
            notebookForm: {
                name: '',
                public: false,
                error: {
                    Name: null
                }
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

export function updateImageFileActionCreator(event) {
    return {
        type: updateImageFileType,
        payload: {
            imageFile: event.target.files[0],
            imageFileName: event.target.files[0].name
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

export function createNotebookActionCreator() {
    return function (dispatch, getState) {
        let notebookFormData = getState().homePage.notebook.notebookForm
        var formData = new FormData();
        formData.append('name', notebookFormData.name);
        formData.append('public', notebookFormData.public);
        formData.append('imageFile', notebookFormData.imageFile);

        axios.post('https://localhost:44388/api/Notebook', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
                dispatch(closeCreateModalActionCreator());
                dispatch(getNotebooksActionCreator());
         }).catch(error => {
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

export function deleteNotebookActionCreator(id) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/Notebook/' + id).then(function (res) {
            dispatch(getNotebooksActionCreator());
            dispatch(closeMenuActionCreator());
        });
    }
}

export function updateNotebookActionCreator(id) {
    return function (dispatch, getState) {
        let notebookFormData = getState().homePage.notebook.notebookForm

        var formData = new FormData();
        formData.append('name', notebookFormData.name);
        formData.append('public', notebookFormData.public);
        formData.append('imageFile', notebookFormData.imageFile);

        axios.put('https://localhost:44388/api/Notebook/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            dispatch(closeEditModalActionCreator());
            dispatch(getNotebooksActionCreator());
        }).catch(error => {
                if (error.response.status == 400) {
                    dispatch({
                        type: errorFormModalType,
                        payload: {
                            ...error.response.data.errors
                        }
                    });
                }
        });;
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
    else if (action.type === updateSwitchFieldsType) {
        return {
            ...state,
            notebookForm: {
                ...state.notebookForm,
                ...action.payload
            }
        }
    }
    else if (action.type === updateImageFileType) {
        return {
            ...state,
            notebookForm: {
                ...state.notebookForm,
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
            notebookForm: {
                ...state.notebookForm,
                error: {
                    ...state.notebookForm.error,
                    ...action.payload
                }
            }
        };
    }

    return state;
};