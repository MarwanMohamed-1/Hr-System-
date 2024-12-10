import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
   constructor(private router:Router){}
Employee = {name:""}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
}

}
