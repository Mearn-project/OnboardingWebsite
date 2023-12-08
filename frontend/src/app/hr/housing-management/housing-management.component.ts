import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { FacilityReport } from '../../models/facility-report.model';
import { Comment } from '../../models/comment.model';
import { House } from '../../models/house.model';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {
  houses: House[] = [];
  reports: FacilityReport[] = [];
  comments: Comment[] = [];

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses() {
    this.housingService.getHousingDetails()
      .subscribe(houses => {
        this.houses = houses.map(house => new House(house));
      });
  }

  addHouse() {
  }

  viewDetails(houseId: string) {
  }

  deleteHouse(houseId: string) {
  }

  loadFacilityReports(houseId: string) {
    this.housingService.getUserFacilityReports(houseId)
      .subscribe(reports => {
        this.reports = reports.map(report => new FacilityReport(report));
      });
  }

  createReport(reportData: FacilityReport) {
    this.housingService.createFacilityReport(reportData)
      .subscribe(newReport => {
        this.reports.push(new FacilityReport(newReport));
      });
  }

  getComment() {
  }

  getCommentById(commentId: string): Comment | undefined {
    return this.comments.find(comment => comment.id === commentId);
  }

  addComment(reportId: string, commentData: string) {
    const newComment = new Comment({ description: commentData, createdBy: 'currentUserId' });
    this.housingService.addCommentToReport(reportId, newComment)
      .subscribe(addedComment => {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
          report.comments?.push(addedComment.id!);
        }
      });
  }

  updateComment(reportId: string, commentId: string, commentData: string) {
    const updatedComment = new Comment({ id: commentId, description: commentData, createdBy: 'currentUserId' });
    this.housingService.updateComment(reportId, commentId, updatedComment)
      .subscribe(updatedComment => {
        // Logic to update comment in the reports array
      });
  }
}