import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../../Services/vacation-request.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-request-vacation',
  standalone: true,
  imports: [CommonModule,MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,ReactiveFormsModule,FormsModule,MatSlideToggleModule],
  templateUrl: './request-vacation.component.html',
  styleUrl: './request-vacation.component.css',
  providers:[VacationRequestService]
})
export class RequestVacationComponent implements OnInit {
loginForm: any;
onSubmit() {
throw new Error('Method not implemented.');
}
  
  constructor(private myServe:VacationRequestService){}
  
      vacationRequests:any;
      errorMessage="";
      email="";
      ngOnInit(): void 
      {
        this.LoadRequests();
      }
      LoadRequests()
      {
        this.myServe.getAllRequests(this.email).subscribe({
          next:(data:any)=>{console.log(data);
          },
          error:(error)=>{console.error(error);
          }
        });
      }
}
