import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IBook } from 'src/app/data/Models/book/book';

@Component({
  selector: 'app-book-details-card',
  templateUrl: './book-details-card.component.html',
  styleUrls: ['./book-details-card.component.scss']
})

export class BookDetailsCardComponent {
  @Input() book: IBook | null = null;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.showModal) {
      this.closeModal.emit();
    }
  }

  onModalClick(event: MouseEvent) {
    // Close modal if clicked on the backdrop (outside the modal content)
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal.emit();
    }
  }
}