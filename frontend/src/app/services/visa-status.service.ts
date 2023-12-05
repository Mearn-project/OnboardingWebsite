// visa-status.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VisaStatus } from '../models/visa-status.model';

@Injectable({
  providedIn: 'root'
})

export class VisaStatusService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getInProgressVisaStatuses() {
    return this.http.get<VisaStatus[]>(`${this.apiUrl}/api/visa-status/in-progress`);
  }

  getAllVisaStatuses() {
    return this.http.get<VisaStatus[]>(`${this.apiUrl}/api/visa-status/all`);
  }

  approveDocument(employeeId: number, documentId: number) {
    return this.http.post<VisaStatus[]>(`${this.apiUrl}/api/visa-status/approve/${employeeId}/${documentId}`, {});
  }

  rejectDocument(employeeId: number, documentId: number, feedback: string) {
    return this.http.post<VisaStatus[]>(`${this.apiUrl}/api/visa-status/reject/${employeeId}/${documentId}`, { feedback });
  }

  sendNotification(employeeId: number) {
    return this.http.post<VisaStatus[]>(`${this.apiUrl}/api/visa-status/notify/${employeeId}`, {});
  }
}
