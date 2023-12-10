import { Component, OnInit } from '@angular/core';
import { HiringService } from '../../services/hiring.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenModalComponent } from '../token-modal/token-modal.component';
import { Application } from '../../models/application.model';
import { ApplicationModalComponent } from '../application-modal/application-modal.component';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  tokens: any[] = [];
  // applications: any[] = [];
  pendingApplications: Application[] = [];
  rejectedApplications: Application[] = [];
  approvedApplications: Application[] = [];

  constructor(
    private hiringService: HiringService,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.loadApplicationsByStatus();
      this.loadTokenHistory();
    }

    openTokenModal() {
      const dialogRef = this.dialog.open(TokenModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.generateToken(result.email);
        }
      });
    }


    generateToken(email: string) {
      this.hiringService.generateRegistrationToken(email).subscribe(tokenData => {
        this.tokens.unshift(tokenData);
        this.loadTokenHistory();
      });
    }



  loadApplicationsByStatus() {
      this.hiringService.getPendingApplications().subscribe(data => {
        this.pendingApplications = data;
        // console.log(data)
      });
      this.hiringService.getRejectedApplications().subscribe(data => {
        this.rejectedApplications = data;
        // console.log(data)
      });
      this.hiringService.getApprovedApplications().subscribe(data => {
        this.approvedApplications = data;
        // console.log(data)
      });
    }


  loadTokenHistory() {
    this.hiringService.getTokenHistory().subscribe(data => {
      this.tokens = data.allEmails;
    });
  }

  viewApplication(application: Application) {
    this.dialog.open(ApplicationModalComponent, {
      width: '500px',
      data: application
    });
  }


  approveApplication(id: string) {
    this.hiringService.approveApplication(id).subscribe(() => {
      this.loadApplicationsByStatus();
    });
  }

  rejectApplication(id: string, feedback: string) {
    this.hiringService.rejectApplication(id, feedback).subscribe(() => {
      this.loadApplicationsByStatus();
    });
  }
}
