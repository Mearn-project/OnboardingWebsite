import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-application-modal',
  templateUrl: './reject-application-modal.component.html',
  styleUrls: ['./reject-application-modal.component.scss']
})
export class RejectApplicationModalComponent {
  feedback: string = '';

  constructor(
    public dialogRef: MatDialogRef<RejectApplicationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { applicationId: string }
  ) {}

  onSubmit() {
    this.dialogRef.close(this.feedback);
  }
}
