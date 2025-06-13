import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardStat } from 'src/app/data/Models/dashboardStat';
import { IUser } from 'src/app/data/Models/user/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private baseUrl = `${environment.apiBaseUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/profile`);
  }

  getDashboardStat(): Observable<IDashboardStat> {
    return this.http.get<IDashboardStat>(`${this.baseUrl}/stats`);
  }
}