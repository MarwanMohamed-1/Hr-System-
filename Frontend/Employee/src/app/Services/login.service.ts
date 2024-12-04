import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //1)Url
  private readonly apiUrl = "https://localhost:7001/api/Login";
  //2)Http==>get post put delete
  constructor(private readonly http:HttpClient) {}
  
  //3)Handle All Requests
  login(user:any)
  {
    return this.http.post(this.apiUrl,user);
  }
}
