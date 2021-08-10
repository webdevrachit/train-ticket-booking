import { CommonTypes } from '../types';

const initialState = {
    showMainLoader: 0,
    showSubLoader: 0,
    snackbar: {open:false, place: 'bc', color: 'success', message:''},
};

function commonReducer(state = initialState, action) {
    switch (action.type) {
        case CommonTypes.SHOWMAINLOADER: {
            return { ...state, showMainLoader : action.show };
        }
        case CommonTypes.SHOWSUBLOADER: {
            return { ...state, showSubLoader : action.show };
        }

        case CommonTypes.SHOWSNACKBAR:{
            return { ...state, snackbar: {...state.snackbar,...action.snackbar}};
        }

        default:
            return state;
    }
}


export default commonReducer;