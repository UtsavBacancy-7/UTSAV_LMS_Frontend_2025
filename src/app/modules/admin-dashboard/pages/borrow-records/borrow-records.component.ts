import { Component, OnInit } from '@angular/core';
import { BorrowService } from 'src/app/core/services/borrow.service';

@Component({
  selector: 'app-borrow-records',
  templateUrl: './borrow-records.component.html',
  styleUrls: ['./borrow-records.component.scss']
})
export class BorrowRecordsComponent {
  currentUserRole: string = 'Admin';
}