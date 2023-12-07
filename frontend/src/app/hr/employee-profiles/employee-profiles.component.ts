import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})
export class NavigationComponent {
}

export class EmployeeProfilesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  search(query: string) {
    if (query) {
      this.employeeService.searchEmployees(query).subscribe(data => {
        this.employees = data;
      });
    } else {
      this.loadEmployees();
    }
  }
}
