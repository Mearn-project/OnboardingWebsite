// src/app/services/housing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacilityReport } from '../models/facility-report.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/api/housing';

  constructor(private http: HttpClient) {}

  getHousingDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createFacilityReport(reportData: FacilityReport): Observable<FacilityReport> {
    return this.http.post<FacilityReport>(`${this.apiUrl}/facility-reports`, reportData);
  }

  getUserFacilityReports(userId: string): Observable<FacilityReport[]> {
    return this.http.get<FacilityReport[]>(`${this.apiUrl}/users/${userId}/facility-reports`);
  }

  addCommentToReport(facilityReportId: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/facility-reports/${facilityReportId}/comments`, comment);
  }

  getCommentsForReport(facilityReportId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/facility-reports/${facilityReportId}/comments`);
  }

  updateComment(facilityReportId: string, commentId: string, comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${this.apiUrl}/facility-reports/${facilityReportId}/comments/${commentId}`, comment);
  }
}