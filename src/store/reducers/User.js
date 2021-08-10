import { UserTypes } from '../types';

const initialState = {
    username: '',
    name: '',
    id: null,
    role:'',
    // username: 'pushuser@gmail.com',
    // name: 'Push User',
    // id: '5ec8ef367b53cc10c42c94fa',
    // role:'user',
    apiKey:'',
    access:{},
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserTypes.SETACCOUNT: {
            return { ...state, ...action.user };
        }

        case UserTypes.LOGOUT: {
            return { ...state, ...initialState };
        }

        default:
            return state;
    }
}


export default userReducer;