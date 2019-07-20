import axios from 'axios';

const searchNotebooksType = 'SEARCH_NOTEBOOKS';


const initialState = {
    notebooks: []
};

export function searchNotebooksActionCreator(searchKey) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/Notebook/Search/' + searchKey).then(function (res) {
            dispatch({
                type: searchNotebooksType,
                payload: {
                    notebooks: res.data
                }
            });
        });
    }
}

export const reducer = (state = initialState, action) => {
    if (action.type === searchNotebooksType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};