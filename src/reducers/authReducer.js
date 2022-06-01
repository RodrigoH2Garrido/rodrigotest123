import { types } from '../types/types'

export const authReducer = ( state = { conectado: false }, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                conectado: true
            }
        case types.logout:
            return {
                conectado: false
            }
        default:
            return state;
    }
}