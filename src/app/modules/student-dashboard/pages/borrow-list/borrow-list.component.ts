import { Component } from '@angular/core';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss']
})
export class BorrowListComponent {
  currentUserRole: string = 'Student';
  listTypes: "Borrow" | "Return" = 'Borrow'
  userId!: number;

  ngOnInit() {
    const id = sessionStorage.getItem('userId');
    this.userId = parseInt(id!);
  }
}