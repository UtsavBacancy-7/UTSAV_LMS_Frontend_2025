import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { PatchOperation } from 'src/app/data/Models/patchOperation';
import { IBorrowResponse } from 'src/app/data/Models/transaction/borrorResponse';
import { IBorrowRequest } from 'src/app/data/Models/transaction/borrowRequest';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private baseUrl = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  // Get all borrow requests
  getAllBorrowRequests(): Observable<IBorrowResponse[]> {
    return this.http.get<IBorrowResponse[]>(`${this.baseUrl}/borrow-requests`);
  }

  // Get borrow request by ID
  getBorrowRequestById(id: number): Observable<IBorrowResponse> {
    return this.http.get<IBorrowResponse>(`${this.baseUrl}/borrow-requests-by-id?id=${id}`);
  }

  // Create a new borrow request
  addBorrowRequest(request: IBorrowRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/borrow-requests`, request);
  }

  patchBorrowRequest(id: number, patchDoc: PatchOperation[]): Observable<void> {
    const params = new HttpParams().set('id', id);
    return this.http.patch<void>(`${this.baseUrl}/borrow-requests`, patchDoc,
      {
        params,
        headers: { 'Content-Type': 'application/json-patch+json' }
      });
  }

  // Delete a borrow request
  deleteBorrowRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/borrow-requests?id=${id}`);
  }
}