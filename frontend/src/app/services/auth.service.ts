// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as LoginActions from '../store/login.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  checkAuthentication() {
    const cookie = this.getCookie('token');
    //console.log('cookie:',cookie)
    if (!cookie) {
      return;
    }


    this.http.get<{ username: string; isHR: boolean }>('http://localhost:3000/api/user/parseToken', { withCredentials: true })
  .subscribe(data => {
    this.store.dispatch(LoginActions.setAuthInfo({ token: cookie, username: data.username, isHR: data.isHR }));
  });
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

}
