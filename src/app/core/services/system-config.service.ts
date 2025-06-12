import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemConfig } from 'src/app/data/Models/setting';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {
  private baseUrl = `${environment.apiBaseUrl}/config`;

  constructor(private http: HttpClient) { }

  getAllConfigs(): Observable<ISystemConfig[]> {
    return this.http.get<ISystemConfig[]>(`${this.baseUrl}`);
  }

  updateConfigs(configs: ISystemConfig[]): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}`, configs);
  }

  getConfigByKey(key: string): Observable<{ success: boolean, key: string, value: string }> {
    return this.http.get<{ success: boolean, key: string, value: string }>(
      `${this.baseUrl}/key?key=${key}`
    );
  }
}
