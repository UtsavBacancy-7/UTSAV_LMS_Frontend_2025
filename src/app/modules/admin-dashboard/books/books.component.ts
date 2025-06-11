import { Component } from '@angular/core';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: IBook[] = [];
  viewMode: 'table' | 'grid' = 'table';
}
