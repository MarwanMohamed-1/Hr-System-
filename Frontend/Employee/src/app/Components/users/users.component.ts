import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule],
  templateUrl: './users.component.html',
  styles: ``,
  providers:[
    UsersService
  ]
})
export class UsersComponent implements OnInit {
  //[Inject Service- Import(httpClientModule) - providers(service)]
  constructor( private myServe:UsersService){}
  employees:any;
  ngOnInit(): void {
    // console.log(this.myServe.getAllEmployees());
    //  this.myServe.getAllEmployees().subscribe(
    //   (data)=>{console.log(data)},
    // (error)=>{console.log(error);
    // });
    
    this.myServe.getAllEmployees().subscribe({
      next:(data)=>{
        this.employees = data;
        console.log(data);
        
      },
      error:(err)=>{console.log(err)},
    })
  }
}
