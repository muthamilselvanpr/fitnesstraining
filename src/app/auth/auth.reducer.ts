import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, authActions } from './auth.action'

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
}

export function authReducer(state = initialState,action: authActions) {
    switch(action.type){
        case SET_AUTHENTICATED: 
            return {
                isAuthenticated: true
            };
        case  SET_UNAUTHENTICATED: 
            return {
                isAuthenticated: false
            };
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;