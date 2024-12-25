  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';



  export interface LoginResponse {
    token: string;
  }

  @Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    private baseUrl = 'http://localhost:8080/api/auth';


    constructor(private http: HttpClient) {}

    login(data: {email: string, password: string}) :Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
    }
  }
