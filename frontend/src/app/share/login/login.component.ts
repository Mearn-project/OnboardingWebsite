import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as LoginActions from '../../store/login.actions';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.store.select((state: AppState) => state.auth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(authState => {
        if (authState.token) {
          // 登录成功
          this.showDialog();
        }
        if (authState.error) {
          // 登录失败处理
          this.loginError = true;
          console.error('登录失败', authState.error);
        }
      });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLogin(): void {
    this.store.dispatch(LoginActions.login({ username: this.username, password: this.password }));
  }

  showDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        dialogRef.close();
        this.router.navigate(['/employee-profiles']);
      }, 3000);
    });
  }
}

