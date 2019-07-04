import axios from 'axios';

const getNotebookType = 'GET_NOTEBOOK';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_SETTINGS_TEXTFIELDS';
export const updateNotebookSettingsType = 'UPDATE_NOTEBOOK_SETTINGS';


const initialState = {
    name: null,
    public: null
};

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function getNotebookActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookType,
                payload: {
                    name: res.data.name,
                    public: res.data.public
                }
            });
        });
    }
}

export function updateNotebookSettingsActionCreator(notebookId) {
    return function (dispatch, getState) {
        let notebookFormData = getState().notebookPage.notebookSettings;
        axios.put('https://localhost:44388/api/Notebook/' + notebookId, notebookFormData).then(function (res) {
            dispatch({
                type: updateNotebookSettingsType,
                payload: res.data
            });
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

    return state;
};