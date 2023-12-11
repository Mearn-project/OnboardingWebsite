import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeVisaStatus } from 'src/app/models/employee-visa-status';
import { EmployeeVisaStatusService } from 'src/app/services/employee-visa-status.service';

@Component({
  selector: 'employee-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrl: './visa-status-management.component.scss',
})
export class EmployeeVisaStatusManagementComponent implements OnInit {
  visaStatus: EmployeeVisaStatus; // Replace with an appropriate type/model
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private visaStatusService: EmployeeVisaStatusService) {
    this.visaStatus = {
      optReceipt: {
        status: '',
        statusMessage: '',
        feedback: '',
        isVisible: false,
      },
      optEad: {
        status: '',
        statusMessage: '',
        feedback: '',
        isVisible: false,
      },
      i983: {
        status: '',
        statusMessage: '',
        feedback: '',
        isVisible: false,
      },
      i20: {
        status: '',
        statusMessage: '',
        feedback: '',
        isVisible: false,
      },
    };
  }

  ngOnInit(): void {
    this.loadVisaStatus();
  }

  loadVisaStatus(): void {
    this.visaStatusService.getVisaStatus().subscribe(
      (status) => {
        console.log(status);
        const fetchedData = status;
        // Updating component state based on fetched data
        this.visaStatus.optReceipt.status = fetchedData.optReceipt.status;
        this.visaStatus.optReceipt.feedback = fetchedData.optReceipt.feedback;
        this.visaStatus.optReceipt.statusMessage = this.getStatusMessage(
          fetchedData.optReceipt.status
        );

        this.visaStatus.optEad.isVisible =
          this.visaStatus.optReceipt.status === 'Approved';
        this.visaStatus.optEad.status = fetchedData.optEAD.status;
        this.visaStatus.optEad.feedback = fetchedData.optEAD.feedback;
        this.visaStatus.optEad.statusMessage = this.getStatusMessage(
          fetchedData.optEAD.status
        );

        this.visaStatus.i983.isVisible =
          this.visaStatus.optEad.status === 'Approved';
        this.visaStatus.i983.status = fetchedData.i983.status;
        this.visaStatus.i983.feedback = fetchedData.i983.feedback;
        this.visaStatus.i983.statusMessage = this.getStatusMessage(
          fetchedData.i983.status
        );

        this.visaStatus.i20.isVisible =
          this.visaStatus.i983.status === 'Approved';
        this.visaStatus.i20.status = fetchedData.i20.status;
        this.visaStatus.i20.feedback = fetchedData.i20.feedback;
        this.visaStatus.i20.statusMessage = this.getStatusMessage(
          fetchedData.i20.status
        );
      },
      (error) => {
        console.error('Error fetching visa status', error);
      }
    );
  }

  getStatusMessage(status: string): string {
    switch (status) {
      case 'Approved':
        return 'Document has been approved';
      case 'Pending':
        return 'Waiting for HR to approve';
      case 'Rejected':
        return 'Document has been rejected';
      default:
        return 'Please update your document';
    }
  }

  uploadDocument(documentType: string): void {
    // Open a file upload dialog and obtain the file
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input is not available');
    }
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.visaStatusService.uploadDocument(documentType, file).subscribe(
          (response) => {
            console.log('Upload successful', response);
            this.updateVisaStatusPostUpload(documentType);
          },
          (error) => {
            console.error('Upload failed', error);
          }
        );
      }
      fileInput.click();
    };
  }

  onFileSelected(event: Event, documentType: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file) {
        this.visaStatusService.uploadDocument(documentType, file).subscribe(
          (response) => {
            // Handle successful upload
            console.log('Upload successful', response);
            this.updateVisaStatusPostUpload(documentType);
          },
          (error) => {
            // Handle upload error
            console.error('Upload failed', error);
          }
        );
      }
    }
  }

  private updateVisaStatusPostUpload(documentType: string): void {
    const section = documentType as keyof EmployeeVisaStatus;
    this.visaStatus[section].status = 'pending';
    this.visaStatus[section].statusMessage = this.getStatusMessage('Pending');
  }

  downloadDocument(documentType: string): void {
    this.visaStatusService.downloadDocument(documentType).subscribe(
      (data) => {
        // Implement logic to download the file, e.g., create a Blob and download link
        this.downloadFile(data, documentType);
      },
      (error) => {
        console.error('Error downloading document', error);
        // Handle error
      }
    );
  }

  private downloadFile(data: Blob, documentType: string): void {
    // Create a Blob from the data and set up a download link
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentType}.pdf`; // or use the filename from the backend
    link.click();
    window.URL.revokeObjectURL(url);
  }

  proceedToNext(nextDocumentType: string): void {
    switch (nextDocumentType) {
      case 'optEad':
        this.visaStatus.optEad.isVisible = true;
        break;
      case 'i983':
        this.visaStatus.i983.isVisible = true;
        break;
      case 'i20':
        this.visaStatus.i20.isVisible = true;
        break;
    }
  }
}
