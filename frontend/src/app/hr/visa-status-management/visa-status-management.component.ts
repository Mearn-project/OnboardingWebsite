import { Component, OnInit } from '@angular/core';
import { VisaStatusService } from '../../services/visa-status.service';
import { VisaStatus } from '../../models/visa-status.model';


@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.scss']
})
export class VisaStatusManagementComponent implements OnInit {
  inProgressDataSource: VisaStatus[] = [];
  allDataSource: VisaStatus[] = [];
  private unfilteredDataSource: VisaStatus[] = [];
  displayedColumns: string[] = ['name', 'workAuthorizationTitle', 'currentStep', 'actions'];
  displayedColumnsAll: string[] = ['name', 'workAuthorizationTitle'];

  constructor(private visaStatusService: VisaStatusService) { }

  ngOnInit(): void {
    this.loadVisaStatuses();
  }

  loadVisaStatuses() {
    this.visaStatusService.getInProgressVisaStatuses().subscribe(users => {
      this.inProgressDataSource = users.map(item => ({
        ...item,
        currentStep: this.calculateCurrentStep(item.visa.i20.status),
        needsApproval: this.doesStepNeedApproval(item.visa.i20.status),
      }));

      this.unfilteredDataSource = [...this.inProgressDataSource];
    });

    this.visaStatusService.getAllVisaStatuses().subscribe(users => {
      this.allDataSource = users;
    });
  }

  calculateCurrentStep(i20Status: string): string {
    if (i20Status === 'Uploading') {
      return 'sent registration token';
    }
    if (i20Status === 'Pending') {
      return 'submitted OPT receipt';
    }
    return 'unknown';
  }

  calculateNextStep(currentStep: string): string {
    switch (currentStep) {
      case 'sent registration token':
        return 'submit onboarding application';
      case 'submitted OPT receipt':
        return 'wait for HR approval';
      default:
        return 'unknown';
    }
  }


  doesStepNeedApproval(i20Status: string): boolean {
    return i20Status === 'Pending';
  }


  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (!value) {
      this.inProgressDataSource = this.unfilteredDataSource;
    } else {
      this.inProgressDataSource = this.unfilteredDataSource.filter(item =>
        item.username.toLowerCase().includes(value.toLowerCase()));
    }
  }

  approveDocument(visaId: string, documentType: string) {
    this.visaStatusService.approveDocument(visaId, documentType).subscribe(() => {
      this.loadVisaStatuses();
    }, error => {
      console.error('Error approving document:', error);
    });
  }

  rejectDocument(visaId: string, documentType: string, feedback: string) {
    this.visaStatusService.rejectDocument(visaId, documentType, feedback).subscribe(() => {
      this.loadVisaStatuses();
    }, error => {
      console.error('Error rejecting document:', error);
    });
  }

  sendNotification(email: string): void {
    this.visaStatusService.sendNotification(email).subscribe(() => {
      console.log('Notification sent to employee with ID:', email);
    });
  }

}
