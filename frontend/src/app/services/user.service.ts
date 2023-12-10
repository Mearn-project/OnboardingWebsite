import { Employee } from './../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditModeKeys } from '../models/personal-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/personal-info';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    // possible authentication
  }

  getUserInfoById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // add personal info schema and pass it in
  updateUserInfo() {}

  updateSection(section: EditModeKeys, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, updateData, {
      withCredentials: true,
    });
  }
}
