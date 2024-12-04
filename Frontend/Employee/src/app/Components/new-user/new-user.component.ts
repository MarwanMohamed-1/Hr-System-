import { Component } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule],
  providers:[
    UsersService
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userAdded = false;
  constructor(private myServe:UsersService){}
  add(name: any, email: any, age: any, salary: any, role: any, address: string)
  {
    let user = {
      name,
      age,
      email,
      salary,
      role,
      address,
      vacationBalance: 21,  // Default value as per Swagger
      password: 'password123' // Default password, or use a dynamic value
    };
    this.myServe.AddNewUser(user).subscribe();
    this.userAdded=true;
  }
}
