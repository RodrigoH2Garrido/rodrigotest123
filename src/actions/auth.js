import {types} from '../types/types';
import firebase from '../services/firebase'


export const login = () => {
    return {
        type: types.login
    }
}



export const logOut = () => {
    return {
        type: types.logOut
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logOut());
    }
}
