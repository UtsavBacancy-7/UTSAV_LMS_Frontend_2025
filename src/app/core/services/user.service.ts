import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { PatchOperation } from 'src/app/data/Models/patchOperation';
import { IUser } from 'src/app/data/Models/user/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  public addUser(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  public getUserById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.baseUrl}/get-by-id`, { params });
  }

  public getUsersByRole(role: string): Observable<any> {
    const params = new HttpParams().set('role', role);
    return this.http.get(`${this.baseUrl}/get-by-role`, { params });
  }

  public updateUser(id: number | undefined, user: IUser): Observable<any> {
    if (id === undefined) {
      throw new Error('User ID is required to update user.');
    }

    const params = new HttpParams().set('id', id.toString());
    return this.http.put(`${this.baseUrl}`, user, { params });
  }

  public patchUser(id: number, patchDoc: PatchOperation[]): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.patch(
      `${this.baseUrl}`,
      patchDoc, {
      params,
      headers: { 'Content-Type': 'application/json-patch+json' }
    },
    );
  }

  public deleteUser(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}