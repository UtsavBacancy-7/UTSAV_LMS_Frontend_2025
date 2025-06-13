import { Component, Input, OnInit } from '@angular/core';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { PatchOperation } from 'src/app/data/Models/patchOperation';
import { IBorrowResponse } from 'src/app/data/Models/transaction/borrorResponse';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss']
})
export class BorrowListComponent implements OnInit {
  @Input() role!: string;
  borrowRequests: IBorrowResponse[] = [];
  isLoading = true;
  currentUserId: string | null = null;

  constructor(
    private borrowService: BorrowService,
  ) { }

  searchTerm: string = '';
  viewMode: 'table' | 'grid' = 'table';
  showRequestForm: boolean = false;
  filteredRequests: IBorrowResponse[] = [];

  applyFilters() {
    if (!this.searchTerm) {
      this.filteredRequests = this.borrowRequests;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.borrowRequests.filter(request =>
      request.title.toLowerCase().includes(term) ||
      request.email.toLowerCase().includes(term) ||
      (request.firstName + ' ' + request.lastName).toLowerCase().includes(term)
    );
  }

  ngOnInit() {
    this.loadBorrowRequests();
  }

  loadBorrowRequests() {
    this.isLoading = true;
    this.borrowService.getAllBorrowRequests().subscribe({
      next: (requests) => {
        this.borrowRequests = requests;
        this.filteredRequests = requests;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading requests:', err);
        this.isLoading = false;
      }
    });
  }

  updateStatus(id: number, newStatus: 'Approved' | 'Rejected'): void {
    const patchDoc: PatchOperation[] = [{
      op: 'replace',
      path: '/status',
      value: newStatus
    }];

    this.borrowService.patchBorrowRequest(id, patchDoc).subscribe({
      next: () => {
        this.loadBorrowRequests();
      },
      error: (err) => {
        console.error('Error updating status:', err);
      }
    });
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.borrowService.deleteBorrowRequest(id).subscribe({
        next: () => {
          this.loadBorrowRequests();
        },
        error: (err) => {
          console.error('Error deleting request:', err);
        }
      });
    }
  }

  canShowActions(): boolean {
    return this.role === 'Admin' || this.role === 'Librarian';
  }

  canDelete(): boolean {
    return this.role === 'Admin';
  }
}