import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss',
})
export class HousingComponent implements OnInit {

  house: any;
  roommates!: any[];
  facilityReports: any[] = [];
  newComment: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getHouseDetails();
    this.getFacilityReports();
  }

  getHouseDetails() {
    this.http.get('http://localhost:3000/housing').subscribe({
      next: (data) => {
        this.house = data;
        this.roommates = this.house.roommates
      },
      error: (error) => {
        console.error('Error fetching house details:', error);
      }
    })
  }

  getFacilityReports() {
    this.http.get<any>(`http://localhost:3000/housing/users/${this.currentUserId}/facility-reports`).subscribe({
      next: (data) => {
        this.facilityReports = data;
      },
      error: (error) => {
        console.error('Error fetching facility reports:', error);
      }
    })
  }

  submitComment(facilityReportId: string) {
    const comment = { description: this.newComment };
    this.http.post('http://localhost:3000/housing/facility-reports/:facilityReportId/comments', comment).subscribe({
      next: (data) => {
        this.newComment = '';
        this.getFacilityReports();
      },
      error: (error) => {
        console.error('Error submitting comment:', error);
      }
    })
  }

  private get currentUserId(): string {
    return '';
  }
}
