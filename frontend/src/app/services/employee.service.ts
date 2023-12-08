import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl = 'http://localhost:3000/api/HR';
  private token: string | null = null;


  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select('auth').subscribe(authState => {
      this.token = authState.token;
    });
  }


  getEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<{ users: Employee[], totalEmployees: number }>(`${this.apiBaseUrl}`, { headers })
        .pipe(
            map(response => response.users)
        );
}


  getEmployeeById(id: string): Observable<Employee[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<{users: Employee[], totalEmployees: number}>(`${this.apiBaseUrl}/id/${id}`, { headers })
      .pipe(
        map(response => response.users)
      );
  }

  getEmployeesByName(name: string): Observable<Employee[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<{users: Employee[], totalEmployees: number}>(`${this.apiBaseUrl}/name/${name}`, { headers })
      .pipe(
        map(response => response.users)
      );
  }

}
