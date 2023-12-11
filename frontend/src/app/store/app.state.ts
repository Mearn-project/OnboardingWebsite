import { AuthState } from './login.reducer';
import { State } from './housing.reducer'
export interface AppState {
  auth: AuthState;
  houses: State;
}