import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { ITransactionHistory } from 'src/app/data/models/transaction/transactionHistory';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  transactions: ITransactionHistory[] = [];
  filteredTransactions: ITransactionHistory[] = [];
  isLoading = true;
  viewMode: 'table' | 'grid' = 'table';
  searchTerm = '';
  statusFilter = 'all';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.transactionService.getTransactionByUserId().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        console.log(transactions);

        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = this.transactions;

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.status.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === this.statusFilter);
    }

    this.filteredTransactions = filtered;
  }
}