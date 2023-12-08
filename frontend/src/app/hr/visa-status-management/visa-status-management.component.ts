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
        nextStep: this.calculateNextStep(item.applicationStatus),
        needsApproval: this.doesStepNeedApproval(item.applicationStatus)
      }));
      this.unfilteredDataSource = users.map(item => ({
        ...item,
        nextStep: this.calculateNextStep(item.applicationStatus),
        needsApproval: this.doesStepNeedApproval(item.applicationStatus)
      }));
    });
    this.visaStatusService.getAllVisaStatuses().subscribe(users => {
      this.allDataSource = users;
    });
  }

  calculateNextStep(currentStep: string): string {
    if (currentStep === 'sent registration token') {
      return 'submit onboarding application';
    }
    if (currentStep === 'submitted OPT receipt') {
      return 'wait for HR approval';
    }
    return 'unknown';
  }

  doesStepNeedApproval(currentStep: string): boolean {
    return currentStep === 'submitted OPT receipt';
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

  sendNotification(employeeId: string): void {
    this.visaStatusService.sendNotification(employeeId).subscribe(() => {
      console.log('Notification sent to employee with ID:', employeeId);
    });
  }

}
