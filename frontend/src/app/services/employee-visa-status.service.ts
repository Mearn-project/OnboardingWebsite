import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class EmployeeVisaStatusService {
  private apiUrl = 'http://localhost:3000/visa'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  // Get the current status of all visa-related documents
  getVisaStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // Upload a document
  uploadDocument(documentType: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append(documentType, file);

    // Optionally, add additional data if required by your backend
    // formData.append('documentType', documentType);

    return this.http.put(`${this.apiUrl}`, formData, {
      withCredentials: true,
    });
  }

  // Example method to download a document
  downloadDocument(documentType: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download-document/${documentType}`, {
      responseType: 'blob',
    });
  }

  // Method to handle feedback or additional actions
  submitFeedback(documentType: string, feedback: string): Observable<any> {
    const data = { documentType, feedback };
    return this.http.post(`${this.apiUrl}/submit-feedback`, data);
  }

  // ... other methods as needed
}
