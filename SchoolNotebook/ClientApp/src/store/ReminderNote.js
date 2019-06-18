import axios from 'axios';

const getReminderNotesType = 'GET_REMINDER_NOTES';
const updateTextFieldsType = 'UPDATE_REMINDER_NOTES_TEXTFIELDS';
const createReminderNoteType = 'CREATE_REMINDER_NOTE';
const openCreateModalType = 'OPEN_CREATE_REMINDER_NOTE_MODAL';
const closeCreateModalType = 'CLOSE_CREATE_REMINDER_NOTE_MODAL';
const openEditModalType = 'OPEN_EDIT_REMINDER_NOTE_MODAL';
const closeEditModalType = 'CLOSE_EDIT_REMINDER_NOTE_MODAL';
const openMenuType = 'OPEN_REMINDER_NOTE_MENU';
const closeMenuType = 'CLOSE_REMINDER_NOTE_MENU';

const initialState = {
    isMenuOpen: false,
    anchorEl: '',
    selectedReminderNoteId: '',
    isEditModalOpen: false,
    isCreateModalOpen: false,
    reminderNotes: [],
    reminderNoteForm: {
        notes: ''
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
                notes: ''
            }
        }
    };
}

export function openEditModalActionCreator(id) {
    return function (dispatch) {
        axios.get('https://localhost:44388/api/ReminderNote/' + id).then(function (res) {
            dispatch({
                type: openEditModalType,
                payload: {
                    isEditModalOpen: true,
                    reminderNoteForm: {
                        notes: res.data.notes
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
                notes: ''
            }
        }
    };
}

export function getReminderNotesActionCreator() {
    return function (dispatch) {

        axios.get('https://localhost:44388/api/ReminderNote').then(function (res) {
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
        let reminderNoteFormData = getState().reminderNote.reminderNoteForm;
        axios.post('https://localhost:44388/api/ReminderNote', reminderNoteFormData).then(function (res) {
            dispatch(closeCreateModalActionCreator());
            dispatch(getReminderNotesActionCreator());
        });
    }
}

export function deleteReminderNoteActionCreator(id) {
    return function (dispatch) {
        axios.delete('https://localhost:44388/api/ReminderNote/' + id).then(function (res) {
            dispatch(getReminderNotesActionCreator());
            dispatch(closeMenuActionCreator());
        });
    }
}

export function updateReminderNoteActionCreator(id) {
    return function (dispatch, getState) {
        let reminderNoteFormData = getState().reminderNote.reminderNoteForm;
        axios.put('https://localhost:44388/api/ReminderNote/' + id, reminderNoteFormData).then(function (res) {
            dispatch(closeEditModalActionCreator());
            dispatch(getReminderNotesActionCreator());
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

    return state;
};