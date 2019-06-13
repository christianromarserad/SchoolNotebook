import axios from 'axios';

const getReminderNotesType = 'GET_REMINDER_NOTES';
const updateTextFieldsType = 'UPDATE_REMINDER_NOTES_TEXTFIELDS';
const createReminderNoteType = 'CREATE_REMINDER_NOTE';
const openReminderNoteModalType = 'OPEN_REMINDER_NOTE_MODAL'
const closeReminderNoteModalType = 'OPEN_REMINDER_NOTE_MODAL'

const initialState = {
    isModalOpen: false,
    reminderNotes: [],
    reminderNoteForm: {
        notes: ''
    }
};

export function openReminderNoteModalActionCreator() {
    return {
        type: openReminderNoteModalType,
        payload: { isModalOpen: true }
    };
}

export function closeReminderNoteModalActionCreator() {
    return {
        type: closeReminderNoteModalType,
        payload: {
            isModalOpen: false,
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
            dispatch(closeReminderNoteModalActionCreator());
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
    else if (action.type === openReminderNoteModalType) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === closeReminderNoteModalType) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
};