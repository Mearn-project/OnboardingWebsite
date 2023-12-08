import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import * as LoginActions from './login.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LoginActions.login),
    mergeMap(action =>
      this.loginService.login(action.username, action.password).pipe(
        map(response => LoginActions.loginSuccess({
          token: response.token, isHR: response.isHR,
          username: action.username
        })),
        catchError(error => of(LoginActions.loginFailure({ error: error.message })))
      )
    )
  )
);

// loginSuccess$ = createEffect(() =>
// this.actions$.pipe(
//   ofType(LoginActions.loginSuccess),
//   tap(({ isHR }) => {
//     if (isHR) {
//       this.router.navigate(['/hr-home']);
//     } else {
//       this.router.navigate(['/employee-home']);
//     }
//   })
// ),
// { dispatch: false }

// );



}
