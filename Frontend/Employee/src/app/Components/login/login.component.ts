import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService],
  imports: [CommonModule, FormsModule, RouterModule,MatToolbarModule
    ,MatInputModule,MatCardModule,MatMenuModule,MatIconModule,
    MatButtonModule,MatTableModule,MatSlideToggleModule,MatSelectModule,MatOptionModule],
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
              this.router.navigate(['/users']); 
            } else {
              this.router.navigate(['/users', data.id]);
            }
          },
          error: (err) => {
            console.error('Error fetching data by email:', err);
            this.loginFailed = true;
          },
        });
      },
      error: (err) => {
        console.error('Failed Login:', err);
        this.loginFailed = true;
      },
    });
  }
}
