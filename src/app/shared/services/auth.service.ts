import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/data/Models/authentication/Login';
import { IRegister } from 'src/app/data/Models/authentication/Register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public register(user: IRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/register`, user);
  }

  public login(loginData: ILogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/login`, loginData);
  }
}
