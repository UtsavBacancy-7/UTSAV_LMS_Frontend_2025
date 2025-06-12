import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-book-details-card',
  templateUrl: './book-details-card.component.html',
  styleUrls: ['./book-details-card.component.scss']
})

export class BookDetailsCardComponent {
  @Input() book: IBook | null = null;
  @Input() showModal: boolean = false;
}