import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Import your main component

@NgModule({
  declarations: [],  // Do not declare AppComponent here since it's standalone
  imports: [
    BrowserModule // Import HttpClientModule here to make HTTP requests
  ],
  providers: [],  // Register your service here
})
export class AppModule { }

// Bootstrap the standalone AppComponent
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent);  // Use bootstrapApplication to bootstrap the standalone component
export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}
