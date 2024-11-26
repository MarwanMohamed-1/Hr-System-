import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';   // Import FormsModule
import { Router, RouterModule } from '@angular/router'; // Import RouterModule if you need routing
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsersService],
  imports: [CommonModule, FormsModule, RouterModule],  // Correct imports
  standalone: true
})
export class LoginComponent {
  constructor(private router:Router,private myServe:UsersService){}
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required.';
      return;
    }else
    {
      this.checkPassword();
    }
  }
  checkPassword() {
    if (this.password.includes('hr')) {
      this.router.navigate(['/users']); // Navigate to the users page
    } else {
      this.myServe.GetByEmail(this.email).subscribe(
        (user: any) => {
          if (user) {
            this.router.navigate(['/user-details', user.id]); // Navigate to user details page
          } else {
            alert('Email not found!');
          }
        }
      );
    }
  }
  
}
