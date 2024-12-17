import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './users.component.html',
  styles: ``,
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  employees: any = []; // Array to store employees

  constructor(private myServe: UsersService,private router:Router) {}

  ngOnInit(): void {
    // Load the list of employees when the component initializes
    this.loadEmployees();
  }

  loadEmployees() {
    this.myServe.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data; // Store the list of employees
        console.log(data);
      },
      error: (err) => {
        this.router.navigate(["/mbxn"]);
      }
    });
  }

  delete(id: any) {
    this.myServe.DeleteUser(id).subscribe({
      next: () => {
        // After successful deletion, reload the employee list
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }
}