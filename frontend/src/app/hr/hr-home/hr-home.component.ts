import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/app.state';
import { logout } from '../../store/login.actions';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.scss']
})
export class HrHomeComponent implements OnInit {
  username$: Observable<string | null> = of(null);

  constructor(
    private loginService: LoginService,
    private store: Store<AppState>,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.username$ = this.store.select(state => state.auth.username);
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.store.dispatch(logout());
      this.router.navigate(['/']);
    });
  }
}
