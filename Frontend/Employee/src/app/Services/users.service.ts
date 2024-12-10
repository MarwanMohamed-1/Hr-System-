import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //1)Url
  private readonly apiUrl = "https://localhost:7001/api/Employee";
  private readonly loginUrl="https://localhost:7001/api/Login";
  //2)Http==>get post put delete
  constructor(private readonly http:HttpClient) {}
  
  //3)Handle All Requests
  getAllEmployees() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Correct syntax
    });

    return this.http.get(this.apiUrl, { headers });
  }
  
  getEmployeeById(id:any){
    return this.http.get(this.apiUrl+"/"+id);
  }
  AddNewUser(user:any)
  {
    return this.http.post(this.apiUrl,user);
  }
  DeleteUser(id:any)
  {
    return this.http.delete(this.apiUrl+"/"+id);
  }
  login(user:any)
  {
    return this.http.post(this.loginUrl,user);
  }
  getbyemail(email:any){
      return this.http.get(this.apiUrl+"/email/"+email);
  }

}
