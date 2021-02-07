import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store'
import { from } from 'rxjs';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
    ui: fromUi.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);
export const getIsAuthenticated = createSelector(getAuthState,fromAuth.getIsAuth);