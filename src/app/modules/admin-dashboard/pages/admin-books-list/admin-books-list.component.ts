// books-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-books',
  templateUrl: './admin-books-list.component.html',
  styleUrls: ['./admin-books-list.component.scss']
})
export class AdminBooksListComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  viewMode: 'table' | 'grid' = 'table';
  searchTerm: string = '';
  availabilityFilter: 'all' | 'available' = 'all';
  isLoading: Boolean = false;

  showModal = false;
  currentBook: IBook | null = null;
  isEditMode = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
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

  applyFilters(): void {
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

  openAddBookModal(): void {
    this.currentBook = null;
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditBookModal(book: IBook): void {
    this.currentBook = JSON.parse(JSON.stringify(book));
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentBook = null;
  }

  showDetailsModal = false;
  selectedBook: IBook | null = null;

  openBookDetails(book: IBook): void {
    this.selectedBook = { ...book };
    this.showDetailsModal = true;
  }

  handleSubmit(bookData: IBook): void {
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
          console.log(bookData)
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => console.error('Error adding book:', err)
      });
    }
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          console.log(bookId);
          this.loadBooks();
        },
        error: (err) => console.error('Error deleting book:', err)
      });
    }
  }
}