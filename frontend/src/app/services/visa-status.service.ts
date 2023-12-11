import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { environment } from '../../environments/environment';
import { VisaStatus } from '../models/visa-status.model';

@Injectable({
  providedIn: 'root'
})

export class VisaStatusService {
  private apiUrl = 'http://localhost:3000/api/HR';
  private token: string | null = null;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select('auth').subscribe(authState => {
      this.token = authState.token;
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

// visa-status.service.ts

getInProgressVisaStatuses(): Observable<VisaStatus[]> {
  return this.http.get<{ users: VisaStatus[] }>(`${this.apiUrl}/visa/not-approved`, { headers: this.getHeaders() })
    .pipe(map(response => response.users));
}

getAllVisaStatuses(): Observable<VisaStatus[]> {
  return this.http.get<{ users: VisaStatus[] }>(`${this.apiUrl}/visa/approved`, { headers: this.getHeaders() })
    .pipe(map(response => response.users));
}


  getVisaById(userId: string): Observable<VisaStatus> {
    return this.http.get<VisaStatus>(`${this.apiUrl}/visa/${userId}`, { headers: this.getHeaders() });
  }

  approveDocument(visaId: string, documentType: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/visa/${visaId}/approve/${documentType}`, {}, { headers: this.getHeaders() });
  }

  rejectDocument(visaId: string, documentType: string, feedback: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/visa/${visaId}/reject/${documentType}`, { feedback }, { headers: this.getHeaders() });
  }

  sendNotification(emailAddress: string): Observable<any> {
    const emailData = { email: emailAddress };
    return this.http.post(`${this.apiUrl}/sendNotification`, emailData, { headers: this.getHeaders() });
  }
}