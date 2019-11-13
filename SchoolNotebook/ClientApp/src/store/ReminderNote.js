// This is used to manage the state of the reminder note item

import axios from 'axios';

const getReminderNotesType = 'GET_REMINDER_NOTES';
const updateTextFieldsType = 'UPDATE_REMINDER_NOTES_TEXTFIELDS';
const createReminderNoteType = 'CREATE_REMINDER_NOTE';
const errorFormModalType = 'ERROR_REMINDER_NOTE_FORM_MODAL';
const openCreateModalType = 'OPEN_CREATE_REMINDER_NOTE_MODAL';
const closeCreateModalType = 'CLOSE_CREATE_REMINDER_NOTE_MODAL';
const openEditModalType = 'OPEN_EDIT_REMINDER_NOTE_MODAL';
const closeEditModalType = 'CLOSE_EDIT_REMINDER_NOTE_MODAL';
const openDeleteModalType = 'OPEN_DELETE_REMINDER_NOTE_MODAL';
const closeDeleteModalType = 'CLOSE_DELETE_REMINDER_NOTE_MODAL';
const openMenuType = 'OPEN_REMINDER_NOTE_MENU';
const closeMenuType = 'CLOSE_REMINDER_NOTE_MENU';

const initialState = {
    isMenuOpen: false,
    anchorEl: null,
    selectedReminderNoteId: '',
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    isCreateModalOpen: false,
    reminderNotes: [],
    reminderNoteForm: {
        notes: '',
        error: {
            Notes: null
        }
    }
};

export function openMenuActionCreator(id, event) {
    return {
        type: openMenuType,
        payload: {
            isMenuOpen: true,
            anchorEl: event.currentTarget,
            selectedReminderNoteId: id
        }
    };
}

export function closeMenuActionCreator() {
    return {
        type: closeMenuType,
        payload: {
            isMenuOpen: false,
            selectedReminderNoteId: ''
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
            reminderNoteForm: {
                notes: '',
                error: {
                    Notes: null
                }
            }
        }
    };
}

export function openDeleteModalActionCreator() {
    return {
        type: openDeleteModalType,
        payload: { isDeleteModalOpen: true }
    };
}

export function closeDeleteModalActionCreator() {
    return {
        type: closeDeleteModalType,
        payload: { isDeleteModalOpen: false }
    };
}

export function openEditModalActionCreator(id) {
    return function (dispatch) {
        axios.get('api/ReminderNote/' + id).then(function (res) {
            dispatch({
                type: openEditModalType,
                payload: {
                    isEditModalOpen: true,
                    reminderNoteForm: {
                        notes: res.data.notes,
                        error: {
                            Notes: null
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
            reminderNoteForm: {
                notes: '',
                error: {
                    Notes: null
                }
            }
        }
    };
}

export function getReminderNotesActionCreator() {
    return function (dispatch) {

        axios.get('api/ReminderNote').then(function (res) {
            dispatch({
                type: getReminderNotesType,
                payload: {
                    reminderNotes: res.data
                }
            });
        });
    }
}

export function updateTextFieldsActionCreator(event) {
    return {
        type: updateTextFieldsType,
        payload: { [event.target.name]: event.target.value }
    };
}

export function createReminderNoteActionCreator() {
    return function (dispatch, getState) {
        let reminderNoteFormData = getState().homePage.reminderNote.reminderNoteForm;
        axios.post('api/ReminderNote', reminderNoteFormData).then(function (res) {
            dispatch(closeCreateModalActionCreator());
            dispatch(getReminderNotesActionCreator());
        })
        .catch(error => {
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

export function deleteReminderNoteActionCreator(id) {
    return function (dispatch) {
        axios.delete('api/ReminderNote/' + id).then(function (res) {
            dispatch(getReminderNotesActionCreator());
            dispatch(closeMenuActionCreator());
            dispatch(closeDeleteModalActionCreator());
        });
    }
}

export function updateReminderNoteActionCreator(id) {
    return function (dispatch, getState) {
        let reminderNoteFormData = getState().homePage.reminderNote.reminderNoteForm;
        axios.put('api/ReminderNote/' + id, reminderNoteFormData).then(function (res) {
            dispatch(closeEditModalActionCreator());
            dispatch(closeMenuActionCreator());
            dispatch(getReminderNotesActionCreator());
        })
        .catch(error => {
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
    if (action.type === getReminderNotesType) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === updateTextFieldsType) {
        return {
            ...state,
            reminderNoteForm: {
                ...state.reminderNoteForm,
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
    else if (action.type === openDeleteModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeDeleteModalType) {
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
            reminderNoteForm: {
                ...state.reminderNoteForm,
                error: {
                    ...state.reminderNoteForm.error,
                    ...action.payload
                }
            }
        };
    }

    return state;
};