import { Component } from '@angular/core';

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
    </mat-toolbar>
  `,
  styles: ``,
})
export class EmployeeNavigationComponent {}
