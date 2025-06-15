// return-book-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReturnService } from 'src/app/core/services/return.service';
import { IReturnRequest } from 'src/app/data/models/transaction/returnRequest';

@Component({
  selector: 'app-return-book-modal',
  templateUrl: './return-book-modal.component.html',
  styleUrls: ['./return-book-modal.component.scss']
})
export class ReturnBookModalComponent {
  @Input() showModal = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() returnSubmittedEvent = new EventEmitter<void>();

  returnData: IReturnRequest = {
    borrowRequestId: 0,
    requestedBy: 0,
    rating: 0,
    comments: ''
  };

  constructor(private returnService: ReturnService) { }

  @Input() set borrowRequestId(id: number) {
    this.returnData.borrowRequestId = id;
  }

  @Input() set requestedBy(id: number) {
    this.returnData.requestedBy = id;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  public submitForm(): void {
    this.returnService.addReturnRequest(this.returnData).subscribe({
      next: () => {
        this.returnSubmittedEvent.emit();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error submitting return request:', err);
      }
    });
  }
}