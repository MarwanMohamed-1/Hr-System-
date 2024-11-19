import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';  // Import the EmployeeService correctly
import { Employee } from '../models/employee.model';  // Import the Employee model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,  // This tells Angular that this component is standalone
  imports: [CommonModule],  // Since this is standalone, imports array would be empty unless you import something specific
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];  // Declare an array to hold employee data

  constructor(private employeeService: EmployeeService) {}  // Inject EmployeeService

  ngOnInit(): void {
    this.loadEmployees();  // Fetch employees on component initialization
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;  // Assign the fetched data to the employees array
      },
      (error) => {
        console.error('Error fetching employee data', error);  // Handle errors if any
      }
    );
  }
}
