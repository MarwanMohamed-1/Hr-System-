import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListItem, MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatListItem,
    MatListModule
  ],
  templateUrl: './users-details.component.html',
  styles: ``,
  providers:[UsersService]
})
export class UsersDetailsComponent implements OnInit{
  //[ID(Activated Route)]-Inject Service(CTOR)-Provide:[UserService]
  Id=0;
  Employee:any;
  description: any;

  constructor(myRoute:ActivatedRoute,private myServ:UsersService){
    this.Id = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.myServ.getEmployeeById(this.Id).subscribe({
      next:(data)=>{this.Employee=data},
      error:(err)=>{console.log(err)}
    });
  }
  requestVacationLinkClicked=false;
  requestedDays: any;
  showRequestDiv()
  {
    this.requestVacationLinkClicked=true;
  }
  closeRequest()
  {
    this.requestVacationLinkClicked=false;
  }

  errorMessage ="";


  showRequestmat: any;
isSuccess: any;
isError: any;
submitRequest() {
  if (this.requestedDays === null || this.requestedDays === undefined || this.requestedDays > 21 || this.requestedDays < 1) {
    this.errorMessage = "Enter Valid Input";
    this.isError = true;
    this.isSuccess = false;
  } else {
    this.isSuccess = true;
    this.isError = false;
    this.clearform();
  }
}


clearform()
{
  this.requestedDays = null;
  this.description = '';
}

}
