import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private http: HttpClient) {}

  register(userData: {
    username: string;
    password: string;
    email: string;
  }): Observable<any> {
    // Implement registration logic, typically an HTTP request to backend
    return this.http.post(
      'http://localhost:3000/user/register/complete',
      userData
    );
  }

  // Additional methods for token generation, email sending, etc.
}
