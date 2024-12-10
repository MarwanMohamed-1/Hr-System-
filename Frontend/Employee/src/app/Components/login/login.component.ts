import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
})
export class LoginComponent {
  Employee: {
    id: string;
    name: string;
    email: string;
    role: string;
  } = {
    id: '',
    name: '',
    email: '',
    role: '',
  };

  loginFailed: boolean = false; // Track login failure

  constructor(private router: Router, private myServe: UsersService) {}

  onLogin(email: string, password: string): void {
    const userLogindto = { email, password };

    // Step 1: Login API call
    this.myServe.login(userLogindto).subscribe({
      next: (response: any) => {
        console.log('Successful Login');

        // Step 2: Extract and store the token
        const token = response.token; // Assuming token is returned from login
        if (token) {
          localStorage.setItem('token', token);
          console.log('Stored Token:', localStorage.getItem('token'));
        }

        // Step 3: Fetch user data by email
        this.myServe.getbyemail(email).subscribe({
          next: (data: any) => {
            console.log('Fetched Data by Email:', data);

            // Step 4: Navigate based on email content
            if (email.toLowerCase().includes('hr')) {
              this.router.navigate(['/users']); // Navigate to HR view
            } else {
              this.router.navigate(['/users', data.id]);
            }
          },
          error: (err) => {
            console.error('Error fetching data by email:', err);
            this.loginFailed = true; // Mark login as failed on error
          },
        });
      },
      error: (err) => {
        console.error('Failed Login:', err);
        this.loginFailed = true; // Mark login as failed
      },
    });
  }
}
