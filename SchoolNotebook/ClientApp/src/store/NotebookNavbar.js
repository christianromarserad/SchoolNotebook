import axios from 'axios';
import { updateNotebookSettingsType } from './NotebookSettings';

const getNotebookNameType = 'GET_NOTEBOOK_NAME';
const getNotebookRatingType = 'GET_NOTEBOOK_RATING';
const getCurrentUserRateType = 'GET_CURRENT_USER_RATING';
const openRateModalType = 'OPEN_RATE_NOTEBOOK_MODAL';
const closeRateModalType = 'CLOSE_RATE_NOTEBOOK_MODAL';
const isNotebookInCollectionType = 'IS_NOTEBOOK_IN_COLLECTION_TYPE';


const initialState = {
    notebookName: null,
    notebookRating: 0,
    numberOfRates: 0,
    userRating: null,
    isRateModalOpen: false,
    isNotebookInCollection: false
};

export function removeFromNotebookCollectionActionCreator(notebookId) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/NotebookCollection/' + notebookId).then(function (res) {
            dispatch(isNotebookInCollectionActionCreator(notebookId));
        })
    }
}

export function addToNotebookCollectionActionCreator(notebookId)  {
    return function (dispatch) {
        axios.post('https://localhost:44388/api/NotebookCollection', { notebookId: notebookId }).then(function (res) {
            dispatch(isNotebookInCollectionActionCreator(notebookId));
        })
    }
}

export function isNotebookInCollectionActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookCollection').then(function (res) {
            let isNotebookInCollection = false;
            res.data.forEach(function (element) {
                if (element.notebookId == notebookId) {
                    isNotebookInCollection = true;
                }
            });

            dispatch({
                type: isNotebookInCollectionType,
                payload: {
                    isNotebookInCollection: isNotebookInCollection
                }
            });
        })
    }
}

export function openRateModalActionCreator() {
    return {
        type: openRateModalType,
        payload: { isRateModalOpen: true }
    };
}

export function closeRateModalActionCreator() {
    return {
        type: closeRateModalType,
        payload: {
            isRateModalOpen: false
        }
    };
}

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

export function getNotebookRatingActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookRate/' + notebookId).then(function (res) {
            let sum = 0;
            let average = 0;

            res.data.forEach(function (element) {
                sum = sum + element.rate;
            });

            if (res.data.length != 0) {
                average = sum / res.data.length;
            }

            dispatch({
                type: getNotebookRatingType,
                payload: {
                    notebookRating: average,
                    numberOfRates: res.data.length
                }
            });
        });
    }
}

export function getCurrentUserRateActionCreator(notebookId) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/NotebookRate/GetCurrentUserRate/' + notebookId).then(function (res) {
            dispatch({
                type: getCurrentUserRateType,
                payload: {
                    userRating: res.data.rate == undefined ? null : res.data.rate
                }
            });
        });
    }
}

export function rateNotebookActionCreator(notebookId, rate) {
    return function (dispatch, getState) {
        let rateFormData = {
            notebookId: notebookId,
            rate: rate
        }

        if (getState().notebookPage.notebookNavbar.userRating == null) {
            axios.post('https://localhost:44388/api/NotebookRate', rateFormData).then(function (res) {
                dispatch(closeRateModalActionCreator());
                dispatch(getCurrentUserRateActionCreator(notebookId));
                dispatch(getNotebookRatingActionCreator(notebookId));
            });
        }
        else {
            axios.put('https://localhost:44388/api/NotebookRate', rateFormData).then(function (res) {
                dispatch(closeRateModalActionCreator());
                dispatch(getCurrentUserRateActionCreator(notebookId));
                dispatch(getNotebookRatingActionCreator(notebookId));
            });
        }
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
    else if (action.type === getCurrentUserRateType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === openRateModalType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === closeRateModalType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateNotebookSettingsType) {
        return {
            ...state,
            notebookName: action.payload.name
        }
    }
    else if (action.type === isNotebookInCollectionType) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
};