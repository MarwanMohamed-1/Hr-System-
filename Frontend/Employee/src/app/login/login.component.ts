import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';   // Import FormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule if you need routing

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],  // Correct imports
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required.';
      return;
    }

    if (this.email === 'hr.admin@gmail.com' && this.password === 'HR_Default_Password123') {
      this.errorMessage = null;
      alert('Login successful for HR!');
    } else if (this.email === 'employee.employee@gmail.com' && this.password === 'Employee123') {
      this.errorMessage = null;
      alert('Login successful for Employee!');
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
