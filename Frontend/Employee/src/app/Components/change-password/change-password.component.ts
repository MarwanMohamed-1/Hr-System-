import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PassChangeService } from '../../Services/pass-change.service';
import { UsersService } from '../../Services/users.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatToolbarModule
    ,MatInputModule,MatCardModule,MatMenuModule,MatIconModule,
    MatButtonModule,MatTableModule,MatSlideToggleModule,MatSelectModule,MatOptionModule],
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
