import { Component, Input, OnInit } from '@angular/core';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { ReturnService } from 'src/app/core/services/return.service';
import { PatchOperation } from 'src/app/data/models/patchOperation';
import { IBorrowResponse } from 'src/app/data/models/transaction/borrowResponse';
import { IReturnResponse } from 'src/app/data/models/transaction/returnResponse';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})

export class TransactionListComponent implements OnInit {

  public borrowRequests: IBorrowResponse[] = [];
  public returnRequests: IReturnResponse[] = [];
  public isLoading = true;
  public currentUserId: string | null = null;
  public statusFilter: string = '';
  public searchTerm: string = '';
  public viewMode: 'table' | 'grid' = 'table';
  public showRequestForm: boolean = false;
  public filteredRequests: (IBorrowResponse | IReturnResponse)[] = [];

  @Input() role!: string;
  @Input() listType!: 'Borrow' | 'Return';

  constructor(private borrowService: BorrowService, private returnService: ReturnService) { }

  get requests(): (IBorrowResponse | IReturnResponse)[] {
    return this.listType === 'Borrow' ? this.borrowRequests : this.returnRequests;
  }

  public ngOnInit(): void {
    this.loadRequests();
  }

  public applyFilters(): void {
    let filtered = this.requests;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(request =>
        request.title.toLowerCase().includes(term) ||
        request.email.toLowerCase().includes(term) ||
        (request.firstName + ' ' + request.lastName).toLowerCase().includes(term)
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(request => request.status === this.statusFilter);
    }

    this.filteredRequests = filtered;
  }

  public loadRequests(): void {
    this.isLoading = true;

    if (this.listType === 'Borrow') {
      this.borrowService.getAllBorrowRequests().subscribe({
        next: (requests) => {
          this.borrowRequests = requests;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading borrow requests:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.returnService.getAllReturnRequests().subscribe({
        next: (requests) => {
          this.returnRequests = requests;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading return requests:', err);
          this.isLoading = false;
        }
      });
    }
  }

  public updateStatus(id: number, newStatus: 'Approved' | 'Rejected'): void {
    const patchDoc: PatchOperation[] = [{
      op: 'replace',
      path: '/status',
      value: newStatus
    }];

    if (this.listType === 'Borrow') {
      this.borrowService.patchBorrowRequest(id, patchDoc).subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error updating borrow status:', err);
        }
      });
    } else {
      this.returnService.patchReturnRequest(id, patchDoc).subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error updating return status:', err);
        }
      });
    }
  }

  public deleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      if (this.listType === 'Borrow') {
        this.borrowService.deleteBorrowRequest(id).subscribe({
          next: () => {
            this.loadRequests();
          },
          error: (err) => {
            console.error('Error deleting borrow request:', err);
          }
        });
      } else {
        this.returnService.deleteReturnRequest(id).subscribe({
          next: () => {
            this.loadRequests();
          },
          error: (err) => {
            console.error('Error deleting return request:', err);
          }
        });
      }
    }
  }

  public canShowActions(): boolean {
    return this.role === 'Admin' || this.role === 'Librarian';
  }

  public canDelete(): boolean {
    return this.role === 'Admin';
  }

  public isBorrowRequest(request: IBorrowResponse | IReturnResponse): request is IBorrowResponse {
    return this.listType === 'Borrow';
  }

  public isReturnRequest(request: IBorrowResponse | IReturnResponse): request is IReturnResponse {
    return this.listType === 'Return';
  }
}