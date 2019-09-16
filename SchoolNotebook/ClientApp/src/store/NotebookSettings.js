import axios from 'axios';

const getNotebookType = 'GET_NOTEBOOK';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_SETTINGS_TEXTFIELDS';
const updateSwitchFieldsType = 'UPDATE_NOTEBOOK_SETTINGS_SWITCHFIELDS';
const updateImageFileType = 'UPDATE_NOTEBOOK_SETTINGS_IMAGE_FILE';
const errorFormModalType = 'ERROR_NOTEBOOK_SETTINGS_FORM_MODAL';
export const updateNotebookSettingsType = 'UPDATE_NOTEBOOK_SETTINGS';


const initialState = {
    name: null,
    public: false,
    imageFile: null,
    imageFileName: null,
    imageFilePath: null,
    error: {
        Name: null
    }
};

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
    let isPublic = event.target.value == "public" ? true : false;
    return {
        type: updateSwitchFieldsType,
        payload: { [name]: isPublic }
    };
}

export function getNotebookActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookType,
                payload: {
                    name: res.data.name,
                    public: res.data.public,
                    imageFilePath: res.data.image,
                    imageFileName: res.data.imageName
                }
            });
        });
    }
}

export function updateNotebookSettingsActionCreator(notebookId) {
    return function (dispatch, getState) {
        let notebookFormData = getState().notebookPage.notebookSettings

        var formData = new FormData();
        formData.append('name', notebookFormData.name);
        formData.append('public', notebookFormData.public);
        formData.append('imageFile', notebookFormData.imageFile);

        axios.put('https://localhost:44388/api/Notebook/' + notebookId, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            dispatch({
                type: updateNotebookSettingsType,
                payload: {
                    name: res.data.name,
                    public: res.data.public,
                    imageFilePath: res.data.image,
                    imageFileName: res.data.imageName
                }
            });
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

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebookType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateSwitchFieldsType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateImageFileType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateNotebookSettingsType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === errorFormModalType) {
        return {
            ...state,
            error: {
                ...action.payload
            }
        };
    }

    return state;
};