import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  isHR: boolean;
  username: string | null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  isHR: false,
  username: null,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { token, isHR, username }) => ({ ...state, token, isHR, username, error: null })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, token: null, isHR: false, username: null, error })),
  on(LoginActions.logout, state => ({ ...initialState }))
);