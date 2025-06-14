import { Component } from '@angular/core';

@Component({
  selector: 'app-borrow-records',
  templateUrl: './borrow-records.component.html',
  styleUrls: ['./borrow-records.component.scss']
})

export class BorrowRecordsComponent {
  currentUserRole: string = 'Admin';
  listTypes: "Borrow" | "Return" = 'Borrow'
}