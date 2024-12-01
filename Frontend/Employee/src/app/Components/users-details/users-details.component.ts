import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [],
  templateUrl: './users-details.component.html',
  styles: ``,
  providers:[UsersService]
})
export class UsersDetailsComponent implements OnInit{
  //[ID(Activated Route)]-Inject Service(CTOR)-Provide:[UserService]
  Id=0;
  Employee:any;
  constructor(myRoute:ActivatedRoute,private myServ:UsersService){
    this.Id = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.myServ.getEmployeeById(this.Id).subscribe({
      next:(data)=>{this.Employee=data},
      error:(err)=>{console.log(err)}
    });
  }
}
