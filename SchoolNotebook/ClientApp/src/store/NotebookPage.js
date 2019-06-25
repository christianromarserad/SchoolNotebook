import axios from 'axios';

const getNotebookType = 'GET_NOTEBOOK';

const initialState = {
    notebookId: null,
    name: ''
};

export function getNotebookActionCreator(id) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/' + id).then(function (res) {
            dispatch({
                type: getNotebookType,
                payload: {
                    notebookId: res.data.id,
                    name: res.data.name
                }
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

    return state;
};