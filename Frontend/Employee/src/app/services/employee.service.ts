import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs';  // Import Observable to handle asynchronous responses
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7001/api/Employee';
  constructor(private http : HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }}
