import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  viewMode: 'table' | 'grid' = 'table';
  searchTerm: string = '';
  availabilityFilter: 'all' | 'available' = 'all';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (books: IBook[]) => {
        console.log(books);

        this.books = books;
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
      const title = book.title?.toLowerCase() || '';
      const author = book.author?.toLowerCase() || '';
      const genre = book.genre?.toLowerCase() || '';

      const matchesSearch =
        term === '' ||
        title.includes(term) ||
        author.includes(term) ||
        genre.includes(term);

      const matchesAvailability =
        this.availabilityFilter === 'all' || book.availableCopies > 0;

      return matchesSearch && matchesAvailability;
    });
  }

  get availableBooksCount(): number {
    return this.filteredBooks.filter(b => b.availableCopies > 0).length;
  }
}