import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../../Services/vacation-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-requests.component.html',
  styleUrl: './hr-requests.component.css',
  providers:[VacationRequestService]
})
export class HrRequestsComponent implements OnInit {
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
