import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH] set authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] set unauthenticated';

export class SetAutheticated implements Action {
    readonly type = SET_AUTHENTICATED
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED
}

export type authActions = SetAutheticated | SetUnauthenticated;