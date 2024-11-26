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
    this.location.back(); // Correct method to go back to the previous page
  }

  reloadPage(): void {
    window.location.reload(); // Reloads the current page
  }
}
