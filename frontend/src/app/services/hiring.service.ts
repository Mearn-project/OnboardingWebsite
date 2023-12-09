import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { TokenHistoryResponse } from '../models/token-history-response.model';

@Injectable({
  providedIn: 'root'
})
export class HiringService {
  private apiUrl = 'http://localhost:3000/api/HR';
  private token: string | null = null;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  private getHeaders(): HttpHeaders {
    this.store.select('auth').subscribe(authState => {
      this.token = authState.token;
    });
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  generateRegistrationToken(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email }, { headers: this.getHeaders() });
  }

  getTokenHistory(): Observable<TokenHistoryResponse> {
    return this.http.get<TokenHistoryResponse>(`${this.apiUrl}/emails`, { headers: this.getHeaders() });
  }

  getPendingApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/pending`, { headers: this.getHeaders() });
  }

  getRejectedApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/rejected`, { headers: this.getHeaders() });
  }

  getApprovedApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/approved`, { headers: this.getHeaders() });
  }

  approveApplication(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/approve/${id}`, {}, { headers: this.getHeaders() });
  }

  rejectApplication(id: number, feedback: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/reject/${id}`, { feedback }, { headers: this.getHeaders() });
  }
}
