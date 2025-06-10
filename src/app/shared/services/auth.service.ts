import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForgotPwd } from 'src/app/data/Models/authentication/forgotPwd';
import { ILogin } from 'src/app/data/Models/authentication/Login';
import { IRegister } from 'src/app/data/Models/authentication/register';
import { IResetPwd } from 'src/app/data/Models/authentication/resetPwd';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public register(user: IRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  public login(loginData: ILogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }

  public forgotPassword(forgotPwdData: IForgotPwd): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-otp`, forgotPwdData);
  }

  public resetPassword(resetPwdData: IResetPwd): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/ResetPassword`, resetPwdData);
  }
}