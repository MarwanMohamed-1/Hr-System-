import { Component } from '@angular/core';

import { LoginComponent } from './Components/login/login.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterModule,
    HeaderComponent
   ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
}
