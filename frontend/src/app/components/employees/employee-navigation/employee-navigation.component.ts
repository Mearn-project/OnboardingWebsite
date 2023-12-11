import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';
import { logout } from 'src/app/store/login.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-employee-navigation',
  template: `
    <mat-toolbar color="primary">
      <span>Employee Portal</span>
      <span class="spacer"></span>
      <nav>
        <a mat-button routerLink="/personal-information">Profile</a>
        <a mat-button routerLink="/housing">Housing</a>
        <a mat-button routerLink="/employee-visa-status-management"
          >Visa Status Management</a
        >
      </nav>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: ``,
})
export class EmployeeNavigationComponent {
  constructor(
    private loginService: LoginService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.store.dispatch(logout());
      this.router.navigate(['/']);
    });
  }
}
