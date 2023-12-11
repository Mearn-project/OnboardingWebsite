// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(
      map(authState => {
        if (!authState.token) {
          this.router.navigate(['/login']);
          return false;
        }

        if (authState.isHR) {
          this.router.navigate(['/hr']);
        } else {
          this.router.navigate(['/employee']);
        }
        return false;
      })
    );
  }
}