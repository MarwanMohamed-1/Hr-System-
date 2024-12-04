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
  onLogin(email:any,password:any): void 
  {
    let userLogindto = {email,password};
    this.myServe.login(userLogindto).subscribe(
      {
        next:()=>{console.log("Successfull Login");},
        error:()=>{console.log("Failed Login");
        }
      }
    );
  }
}
