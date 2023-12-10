import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { TokenHistoryResponse } from '../models/token-history-response.model';
import { Application } from '../models/application.model';

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

  getPendingApplications(): Observable<Application[]> {
    return this.http.get<{pendingApplications: Application[]}>(`${this.apiUrl}/applications/pending`, { headers: this.getHeaders() }).pipe(
      map(response => response.pendingApplications)
    );
  }

  getRejectedApplications(): Observable<Application[]> {
    return this.http.get<{rejectedApplications: Application[]}>(`${this.apiUrl}/applications/rejected`, { headers: this.getHeaders() }).pipe(
      map(response => response.rejectedApplications)
    );
  }

  getApprovedApplications(): Observable<Application[]> {
    return this.http.get<{approvedApplications: Application[]}>(`${this.apiUrl}/applications/approved`, { headers: this.getHeaders() }).pipe(
      map(response => response.approvedApplications)
    );
  }

  approveApplication(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/${id}/approve`, {}, { headers: this.getHeaders() });
  }

  rejectApplication(id: string, feedback: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/applications/${id}/reject`, { feedback }, { headers: this.getHeaders() });
  }
}
