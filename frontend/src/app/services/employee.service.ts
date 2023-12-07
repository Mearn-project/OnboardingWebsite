// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl = 'http://backend-api.com';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employees`);
  }

  searchEmployees(query: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employees/search`, { params: { query } });
  }
}
