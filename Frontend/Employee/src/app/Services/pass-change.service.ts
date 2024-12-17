import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassChangeService {
  //1-Url
  private readonly apiUrl = "https://localhost:7001/api/ChangePassword/change-password";
  // 2-Http
  constructor(private http:HttpClient) { }
  //3-Handle Request
  changePassword(changePasswordObject:any)
  {
    return this.http.put(this.apiUrl,changePasswordObject);
  }
}
