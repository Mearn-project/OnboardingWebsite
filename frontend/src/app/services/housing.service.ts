import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { House } from '../models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/api/HR';
  private token: string | null = null;


  constructor(private http: HttpClient, private store: Store<AppState>) {}

  private getHeaders(): HttpHeaders {
    this.store.select('auth').subscribe(authState => {
      this.token = authState.token;
    });
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getHousingDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/houses/`, { headers: this.getHeaders() });
  }

  // addHouse(houseDetails: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/houses/add`, houseDetails, { headers: this.getHeaders() });
  // }
  addHouse(houseDetails: any): Observable<{ message: string; house: House }> {
    return this.http.post<{ message: string; house: House }>(`${this.apiUrl}/houses/add`, houseDetails, { headers: this.getHeaders() });
  }

  deleteHouse(houseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/houses/${houseId}`, { headers: this.getHeaders() });
  }

  addCommentToReport(facilityReportId: string, description: string): Observable<any> {
    const commentData = { description };
    return this.http.post<any>(`${this.apiUrl}/report/${facilityReportId}/comment`, commentData, { headers: this.getHeaders() });
  }


}