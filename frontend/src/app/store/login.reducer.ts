import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export interface State {
  token: string | null;
  error: string | null;
}

export const initialState: State = {
  token: null,
  error: null
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, token: null, error }))
);
