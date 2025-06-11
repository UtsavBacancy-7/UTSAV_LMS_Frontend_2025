import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateGenre } from 'src/app/data/Models/genre/createGenre';
import { IGenre } from 'src/app/data/Models/genre/genre';
import { IUpdateGenre } from 'src/app/data/Models/genre/updateGenre';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseUrl = `${environment.apiBaseUrl}/genre`;

  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<{ success: boolean; message: string; data: IGenre[] }> {
    return this.http.get<{ success: boolean; message: string; data: IGenre[] }>(`${this.baseUrl}/all`);
  }

  getGenreById(id: number): Observable<IGenre> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<IGenre>(`${this.baseUrl}/get-by-id`, { params });
  }

  createGenre(payload: ICreateGenre): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, payload);
  }

  updateGenre(payload: IUpdateGenre): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, payload);
  }

  deleteGenre(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete`, { params });
  }
}