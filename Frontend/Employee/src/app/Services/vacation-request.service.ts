import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationRequestService {

  //Url
  private readonly url ="https://localhost:7001/api/VacationRequest";
  // HttpClient
  constructor(private readonly http:HttpClient) { }
  //fetch data 
  getAllRequests(email: string){
    const url = `${this.url}/email?=${email}`;
    return this.http.get(url);
  }

}
