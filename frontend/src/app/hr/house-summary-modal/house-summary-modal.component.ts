import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addCommentToReport } from '../../store/housing.actions'; // Adjust import path as needed
import { House, Comment } from '../../models/house.model';  // Adjust import path as needed
import { AppState } from '../../store/app.state';  // Adjust import path as needed

@Component({
  selector: 'app-house-summary-modal',
  templateUrl: './house-summary-modal.component.html',
  styleUrls: ['./house-summary-modal.component.scss']
})
export class HouseSummaryModalComponent implements OnInit {
  houses$: Observable<House[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { house: House },
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<HouseSummaryModalComponent>
  ) {
    this.houses$ = this.store.select(state => state.houses.houses);
  }

  ngOnInit(): void {
  }

  addComment(reportId: string, commentText: string): void {
    this.store.dispatch(addCommentToReport({
      facilityReportId: reportId,
      comment: commentText
    }));

    const newComment: Comment = {
      _id: this.generateRandomId(),
      description: commentText,
      createdBy: 'RandomUser',
      timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      __v: 0
    };

    let updatedHouse = { ...this.data.house };
    const reportIndex = updatedHouse.facilityReports.findIndex(r => r._id === reportId);
    if (reportIndex !== -1) {
      let updatedReports = [...updatedHouse.facilityReports];
      let updatedReport = { ...updatedReports[reportIndex] };
      updatedReport.comments = [...updatedReport.comments, newComment];
      updatedReports[reportIndex] = updatedReport;
      updatedHouse.facilityReports = updatedReports;
      this.data.house = updatedHouse;
    }
  }


  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
