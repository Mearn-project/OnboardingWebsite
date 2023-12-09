import { Component, OnInit } from '@angular/core';
import { HiringService } from '../../services/hiring.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenModalComponent } from '../token-modal/token-modal.component';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  tokens: any[] = [];
  applications: any[] = [];

  constructor(
    private hiringService: HiringService,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.loadApplications();
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



  loadApplications() {
    this.hiringService.getApplications().subscribe(applications => {
      this.applications = applications;
    });
  }


  loadTokenHistory() {
    this.hiringService.getTokenHistory().subscribe(data => {
      this.tokens = data.allEmails;
    });
  }

  viewApplication(id: number) {
    window.open('/application/' + id, '_blank');
  }


  approveApplication(id: number) {
    this.hiringService.approveApplication(id).subscribe(() => {
      this.loadApplications();
    });
  }

  rejectApplication(id: number, feedback: string) {
    this.hiringService.rejectApplication(id, feedback).subscribe(() => {
      this.loadApplications();
    });
  }
}
