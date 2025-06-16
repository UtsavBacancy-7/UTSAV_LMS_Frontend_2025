import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotification } from 'src/app/data/models/wishlist-notification/notification';
import { environment } from 'src/environments/environment.development';
import { EmptyResponse } from 'src/app/data/models/emptyResponse';
import { ApiResponse } from 'src/app/data/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiBaseUrl}/notifications`;

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<ApiResponse<INotification[]>> {
    return this.http.get<ApiResponse<INotification[]>>(`${this.apiUrl}/my-notifications`);
  }

  markAsRead(notificationId: string): Observable<EmptyResponse> {
    return this.http.post<EmptyResponse>(`${this.apiUrl}/read?notificationId=${notificationId}`, {});
  }

  markAllAsRead(): Observable<EmptyResponse> {
    return this.http.post<EmptyResponse>(`${this.apiUrl}/mark-all-read`, {});
  }
}