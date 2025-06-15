import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/core/services/book.service';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { IBook } from 'src/app/data/models/book/book';

type UserRole = 'admin' | 'librarian' | 'student';
type ViewMode = 'table' | 'grid';
type AvailabilityFilter = 'all' | 'available';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit {
  @Input() role: UserRole = 'student';

  public books: IBook[] = [];
  public filteredBooks: IBook[] = [];
  public viewMode: ViewMode = 'table';
  public searchTerm: string = '';
  public availabilityFilter: AvailabilityFilter = 'all';
  public isLoading: Boolean = false;
  public showModal = false;
  public currentBook: IBook | null = null;
  public isEditMode = false;
  public showDetailsModal = false;
  public selectedBook: IBook | null = null;
  public userId!: number;
  constructor(private bookService: BookService, private borrowService: BorrowService, private messageService: MessageService) { }

  public ngOnInit(): void {
    this.loadBooks();
    const userId = sessionStorage.getItem('userId');
    this.userId = userId ? Number(userId) : 0;
  }

  public loadBooks(): void {
    this.isLoading = true;
    this.bookService.getAllBooks().subscribe({
      next: (books: IBook[]) => {
        this.books = books;
        this.isLoading = false;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load books:', err);
        this.books = [];
        this.filteredBooks = [];
      }
    });
  }

  public applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredBooks = this.books.filter(book => {
      const matchesSearch =
        term === '' ||
        book.title?.toLowerCase().includes(term) ||
        book.author?.toLowerCase().includes(term) ||
        book.genreName?.toLowerCase().includes(term);

      const matchesAvailability =
        this.availabilityFilter === 'all' || book.availableCopies > 0;

      return matchesSearch && matchesAvailability;
    });
  }

  public openAddBookModal(): void {
    this.currentBook = null;
    this.isEditMode = false;
    this.showModal = true;
  }

  public openEditBookModal(book: IBook): void {
    this.currentBook = JSON.parse(JSON.stringify(book));
    this.isEditMode = true;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
    this.currentBook = null;
  }

  public openBookDetails(book: IBook): void {
    this.selectedBook = { ...book };
    this.showDetailsModal = true;
  }

  public handleSubmit(bookData: IBook): void {
    if (this.isEditMode && this.currentBook?.id) {
      this.bookService.updateBook(this.currentBook.id, bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating book:', err)
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => console.error('Error adding book:', err)
      });
    }
  }

  public deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => console.error('Error deleting book:', err)
      });
    }
  }

  public addToWishlist(book: IBook): void {
    console.log('Added to wishlist:', book);
    alert(`Added "${book.title}" to your wishlist`);
  }

  public borrowBook(bookId: number): void {
    this.borrowService.addBorrowRequest({ bookId: bookId, userId: this.userId }).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Request Sent',
          detail: 'Borrow request sent to the librarian.',
          life: 3000
        });
      },
      error: (err) => {
        let errorMessage = 'Failed to process borrow request';

        if (err.error && err.error.Message) {
          errorMessage = err.error.Message;
        } else if (err.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Request Failed',
          detail: errorMessage,
          life: 3000
        });
      }
    });
  }

  public returnBook(book: IBook): void {
    console.log('Returning book:', book);
    alert(`Returned "${book.title}"`);
  }

  public canAddBooks(): boolean {
    return this.role === 'admin' || this.role === 'librarian';
  }
}