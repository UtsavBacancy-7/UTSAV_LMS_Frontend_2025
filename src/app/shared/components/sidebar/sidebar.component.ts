import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  uiComponents = [
    { label: 'Books', icon: 'bi bi-book', route: '/admin/books' },
    { label: 'Categories', icon: 'bi bi-tags', route: '/admin/categories' },
    { label: 'Students', icon: 'bi bi-people', route: '/admin/students' },
    { label: 'Librarians', icon: 'bi bi-person-workspace', route: '/admin/librarians' },
    { label: 'Issue Books', icon: 'bi bi-journal-arrow-up', route: '/admin/issue-books' },
    { label: 'Return Books', icon: 'bi bi-journal-arrow-down', route: '/admin/return-books' },
    { label: 'Reviews', icon: 'bi bi-chat-left-dots', route: '/admin/reviews' },
    { label: 'Notifications', icon: 'bi bi-bell', route: '/admin/notifications' },
    { label: 'Reports', icon: 'bi bi-bar-chart-line', route: '/admin/reports' },
    { label: 'Settings', icon: 'bi bi-gear', route: '/admin/settings' }
  ];
}
