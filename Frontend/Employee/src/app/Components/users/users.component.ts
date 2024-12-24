import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './users.component.html',
  styles:  [`
    .container {
      margin: 20px;
    }

    .action-icons {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .mat-card-header {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      font-weight: bold;
      background-color: #f5f5f5;
    }

    td, th {
      padding: 12px;
      border: 1px solid #ddd;
    }

    .loading-card {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
  `],
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