import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})

export class EmployeeProfilesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];


  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.map(e => ({
        ...e,
        name: e.preferredName || `${e.application.firstName} ${e.application.lastName}`,
        workAuthorizationTitle: e.application.workAuthorization,
        phoneNumber: e.application.cellPhone,
        ssn: e.application.ssn
      }));
      // console.log(this.employees)
      this.filteredEmployees = this.employees;
    });
  }

  search(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    if (!term) {
      this.filteredEmployees = this.employees;
    } else {
      this.employeeService.getEmployeesByName(term).subscribe(data => {
        this.filteredEmployees = data.map(e => ({
          ...e,
          name: e.preferredName || `${e.application.firstName} ${e.application.lastName}`,
          workAuthorizationTitle: e.application.workAuthorization,
          phoneNumber: e.application.cellPhone,
          ssn: e.application.ssn
        }));
      });
    }
  }
}
