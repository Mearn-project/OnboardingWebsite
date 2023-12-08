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
    this.employeeService.getEmployees().subscribe(employees => {
      console.log(employees)
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }

  search(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    if (!term) {
      this.filteredEmployees = this.employees;
    } else {
      this.employeeService.getEmployeesByName(term).subscribe(employees => {
        this.filteredEmployees = employees;
      });
    }
  }
}
