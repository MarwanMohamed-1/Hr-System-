import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styles: [`
    .app-title {
      font-size: 20px;
      font-weight: bold;
      color: white;
      padding-left: 16px;
    }
    .spacer {
      flex: 1;
    }
    .sidenav-container {
      height: calc(100vh - 64px); /* Adjust to account for the toolbar height */
    }
    .sidenav {
      width: 250px;
    }
    mat-nav-list a {
      font-size: 16px;
      font-weight: 500;
    }
    mat-nav-list a.active-link {
      font-weight: bold;
      text-decoration: underline;
      color: #1976d2;
    }
    .content {
      padding: 16px;
    }
  `]
  ,
})
export class HeaderComponent {
  isMenuOpen = false;
constructor(private r:Router){}
  logout() {
    this.r.navigate(['/']);
    localStorage.removeItem('token');
  }
}
