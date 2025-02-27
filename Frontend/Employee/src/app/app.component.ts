import { Component } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ LoginComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
}
