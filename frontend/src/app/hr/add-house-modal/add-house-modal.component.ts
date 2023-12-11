import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-house-modal',
  templateUrl: './add-house-modal.component.html',
  styleUrls: ['./add-house-modal.component.scss']
})
export class AddHouseModalComponent {
  house = {
    address: '',
    landlord: {
      fullName: '',
      phoneNumber: '',
      email: ''
    }
  };

  constructor(public dialogRef: MatDialogRef<AddHouseModalComponent>) {}

  onAddHouse(): void {
    this.dialogRef.close(this.house);
  }
}
