import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})

export class BookCardComponent {
  @Input() book!: IBook;
  @Input() displayMode: 'compact' | 'detailed' = 'detailed';
  @Input() showActions: boolean = false;
}