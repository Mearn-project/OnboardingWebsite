import { Component } from '@angular/core';

@Component({
  selector: 'app-facility-report',
  standalone: true,
  imports: [],
  templateUrl: './facility-report.component.html',
  styleUrl: './facility-report.component.scss'
})
export class FacilityReportComponent {

  title: string ='';
  description: string ='';

  submitFacilityReport() {
    //submit
  }

}
