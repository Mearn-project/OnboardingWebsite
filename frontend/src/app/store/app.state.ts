import { State as AuthState } from './login.reducer';

export interface AppState {
  auth: AuthState;
}