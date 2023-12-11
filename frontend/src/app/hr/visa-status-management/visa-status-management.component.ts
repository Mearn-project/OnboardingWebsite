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
        currentStep: this.calculateCurrentStep(item.visa.optReceipt.status),
        needsApproval: this.doesStepNeedApproval(item.visa.optReceipt.status),
      }));
      console.log(this.inProgressDataSource)
      this.unfilteredDataSource = [...this.inProgressDataSource];
    });
    this.visaStatusService.getAllVisaStatuses().subscribe(users => {
      this.allDataSource = users;
    });
  }

  calculateCurrentStep(optReceiptStatus: string): string {
    if (optReceiptStatus === 'Uploading') {
      return 'sent registration token';
    }
    if (optReceiptStatus === 'Pending') {
      return 'submitted OPT receipt';
    }
    if (optReceiptStatus === 'Approved') {
      return 'Approved OPT receipt';
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


  doesStepNeedApproval(optReceiptStatus: string): boolean {
    return optReceiptStatus === 'Pending';
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

  previewDocument(previewUrl: string): void {
    window.open(previewUrl, '_blank');
  }

  approveDocument(visaId: string) {
    this.visaStatusService.approveDocument(visaId).subscribe(() => {
      this.loadVisaStatuses();
    }, error => {
      console.error('Error approving document:', error);
    });
  }

  rejectDocument(visaId: string, feedback: string) {
    this.visaStatusService.rejectDocument(visaId, feedback).subscribe(() => {
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
