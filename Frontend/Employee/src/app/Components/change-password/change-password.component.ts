import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PassChangeService } from '../../Services/pass-change.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers:[PassChangeService,UsersService]
})
export class ChangePasswordComponent {

  constructor(private myServe:PassChangeService,private userService:UsersService){}



  changePasswordData={oldPassword:"",newPassword:"",confirmPassword:"",email:""}
  passwordChanged: boolean = false;
  errorMessage: string = '';

  onChangePassword() {
    this.passwordChanged = false;
    this.errorMessage = '';

    const { email, oldPassword, newPassword, confirmPassword } = this.changePasswordData;

    // Check for empty fields
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
        this.errorMessage = 'All fields are required.';
        return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        this.errorMessage = 'New passwords do not match.';
        return;
    }

    // Verify if the email exists
    this.userService.getbyemail(email).subscribe({
        next: (employee) => {
            if (!employee) {
                this.errorMessage = 'Invalid email address.';
                return;
            }

            // Proceed to change the password
            this.myServe.changePassword(this.changePasswordData).subscribe({


                next: () => {
                    this.passwordChanged = true;
                    console.log('Password changed successfully.');
                },
                error: (err) => {
                    this.errorMessage="check entered data";
            }});
        },
        error: () => {
            this.errorMessage = 'Error checking email. Please try again later.';
        }
    });
}
  
  

}
