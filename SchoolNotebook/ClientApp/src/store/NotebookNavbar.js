import axios from 'axios';

const getNotebookNameType = 'GET_NOTEBOOK_NAME';
const getNotebookRatingType = 'GET_NOTEBOOK_RATING';


const initialState = {
    notebookName: null
};

export function getNotebookNameActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/' + notebookId).then(function (res) {
            dispatch({
                type: getNotebookNameType,
                payload: {
                    notebookName: res.data.name
                }
            });
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === getNotebookNameType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === getNotebookRatingType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};