import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-modal',
  templateUrl: './application-modal.component.html',
  styleUrls: ['./application-modal.component.scss']
})
export class ApplicationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public application: Application) {}
}
