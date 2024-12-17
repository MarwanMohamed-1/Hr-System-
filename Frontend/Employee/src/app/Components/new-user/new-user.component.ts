import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../Services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers: [UsersService],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  userForm: FormGroup;
  userAdded = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [
        '',
        [Validators.required, Validators.min(18), Validators.max(60)],
      ],
      salary: ['', [Validators.required, Validators.min(1000)]],
      role: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  add() {
    if (this.userForm.valid) {
      const newUser = {
        ...this.userForm.value,
        vacationBalance: 21,
        password: 'password123', // Placeholder password
      };

      this.userService.AddNewUser(newUser).subscribe(() => {
        this.userAdded = true;
        this.router.navigate(['/users']); // Redirect to the users list after adding
      });
    } else {
      this.userForm.markAllAsTouched(); // Highlight invalid fields
    }
  }

  cancel() {
    this.router.navigate(['/users']); // Navigate back to users list without adding
  }
}
