import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import * as LoginActions from './login.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginEffects {
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LoginActions.login),
    mergeMap(action =>
      this.loginService.login(action.username, action.password).pipe(
        map(token => LoginActions.loginSuccess({ token })),
        catchError(error => of(LoginActions.loginFailure({ error: error.message })))
      )
    )
  )
);

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}
}
