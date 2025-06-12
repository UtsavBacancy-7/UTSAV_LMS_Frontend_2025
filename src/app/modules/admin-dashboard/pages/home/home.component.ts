import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dashboardCards = [
    { title: 'Total Books', value: '1,200', subtext: '150 new this month', icon: 'bi bi-book', subtextClass: 'text-success' },
    { title: 'Issued Books', value: '890', subtext: '45 issued today', icon: 'bi bi-journal-arrow-up', subtextClass: 'text-success' },
    { title: 'Returned Books', value: '780', subtext: '30 returned today', icon: 'bi bi-journal-arrow-down', subtextClass: 'text-info' },
    { title: 'Overdue Returns', value: '15', subtext: '5 overdue today', icon: 'bi bi-exclamation-triangle', subtextClass: 'text-danger' },
    { title: 'Total Students', value: '1,050', subtext: '20 joined this week', icon: 'bi bi-people', subtextClass: 'text-success' },
    { title: 'Total Librarians', value: '5', subtext: '1 new librarian added', icon: 'bi bi-person-workspace', subtextClass: 'text-info' },
    { title: 'Book Reviews', value: '342', subtext: '10 new reviews today', icon: 'bi bi-chat-left-text', subtextClass: 'text-primary' },
    { title: 'Total Categories', value: '25', subtext: '2 new categories', icon: 'bi bi-tags', subtextClass: 'text-warning' }
  ];

  issues = [
    { image: 'assets/images/books/book1.jpg', title: 'The Alchemist', issuedTo: 'John Doe', dueDate: new Date('2025-06-15') },
    { image: 'assets/images/books/book2.jpg', title: 'Atomic Habits', issuedTo: 'Priya Patel', dueDate: new Date('2025-06-13') },
    { image: 'assets/images/books/book3.jpg', title: 'Deep Work', issuedTo: 'Rahul Sharma', dueDate: new Date('2025-06-18') },
    { image: 'assets/images/books/book4.jpg', title: 'Clean Code', issuedTo: 'Anjali Mehta', dueDate: new Date('2025-06-20') },
    { image: 'assets/images/books/book5.jpg', title: 'Rich Dad Poor Dad', issuedTo: 'Nikhil Verma', dueDate: new Date('2025-06-14') }
  ];
}