import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/core/services/book.service';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { WishlistAndNotificationService } from 'src/app/core/services/wishlist-and-notification.service';
import { IBook } from 'src/app/data/models/book/book';
import { TokenService } from '../../services/token.service';

type UserRole = 'Administrator' | 'Librarian' | 'Student';
type ViewMode = 'table' | 'grid';
type AvailabilityFilter = 'all' | 'available';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit {
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
  @Input() role: UserRole = 'Student';

  constructor(
    private bookService: BookService,
    private borrowService: BorrowService,
    private messageService: MessageService,
    private tokenService: TokenService,
    private wishlistService: WishlistAndNotificationService
  ) { }

  public ngOnInit(): void {
    this.loadBooks();
    const userId = Number(this.tokenService.getUserId());
    this.userId = userId || 0;
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load books.'
        })
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
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update book',
          })
        }
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add book',
          })
        }
      });
    }
  }

  public deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.loadBooks();
          this.messageService.add({
            severity: 'success',
            summary: 'Book deleted',
            detail: 'Book has been successfully deleted',
          })
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete book',
          })
        }
      });
    }
  }

  public addToWishlist(book: IBook): void {
    this.wishlistService.addToWishList(book.id).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Book Added',
            detail: 'Book has been added to your wishlist',
          });
        }
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Failed to add book to wishlist';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    })
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
    alert(`Returned "${book.title}"`);
  }

  public canAddBooks(): boolean {
    return this.role === 'Administrator' || this.role === 'Librarian';
  }
}