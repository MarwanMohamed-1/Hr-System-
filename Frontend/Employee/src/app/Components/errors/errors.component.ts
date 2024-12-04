import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [],
  templateUrl: './errors.component.html',
  styles: []
})
export class ErrorsComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); 
  }

  reloadPage(): void {
    window.location.reload();
  }
}
