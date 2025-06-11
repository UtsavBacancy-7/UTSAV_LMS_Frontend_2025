import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IBook } from 'src/app/data/Models/book/book';
import { PatchOperation } from 'src/app/data/Models/patchOperation';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private baseUrl = `${environment.apiBaseUrl}/books`;

  constructor(private http: HttpClient) { }

  public addBook(book: IBook): Observable<any> {
    return this.http.post(`${this.baseUrl}`, book);
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<{ data: IBook[] }>(`${this.baseUrl}`).pipe(
      map(response => response.data)
    );
  }

  public getBookById(id: number): Observable<IBook> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<IBook>(`${this.baseUrl}/get-by-id`, { params });
  }

  public deleteBook(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}`, { params });
  }

  public patchBook(id: number, patchDoc: PatchOperation[]): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.patch(`${this.baseUrl}`, patchDoc, { params });
  }

  public updateBook(id: number, book: IBook): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put(`${this.baseUrl}`, book, { params });
  }
}
