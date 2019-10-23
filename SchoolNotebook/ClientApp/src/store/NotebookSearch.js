import axios from 'axios';

const searchNotebooksType = 'SEARCH_NOTEBOOKS';
const updateTextFieldsType = 'UPDATE_NOTEBOOK_SEARCH_TEXTFIELDS';


const initialState = {
    searchKey: '',
    notebooks: []
};

export function searchNotebooksActionCreator(searchKey) {
    return function (dispatch) {
        if (searchKey != '') {
            axios.get('api/Notebook/Search/' + searchKey).then(function (res) {
                dispatch({
                    type: searchNotebooksType,
                    payload: {
                        notebooks: res.data
                    }
                });
            });
        }
    }
}

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export const reducer = (state = initialState, action) => {
    if (action.type === searchNotebooksType) {
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