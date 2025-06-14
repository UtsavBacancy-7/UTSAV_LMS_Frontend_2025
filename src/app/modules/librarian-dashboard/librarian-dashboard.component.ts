import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-librarian-dashboard',
    templateUrl: './librarian-dashboard.component.html',
    styleUrls: ['./librarian-dashboard.component.scss']
})

export class LibrarianDashboardComponent {
    role: 'Admin' | 'Librarian' | 'Student' = 'Librarian';
    constructor(private router: Router) { }

    public sidebarOptions = [
        {
            section: 'Dashboard',
            items: [
                { label: 'Overview', icon: 'bi bi-speedometer2', route: '/dashboard/librarian/home' }
            ]
        },
        {
            section: 'Library',
            items: [
                { label: 'Books', icon: 'bi bi-book', route: '/dashboard/librarian/books' },
            ]
        },
        {
            section: 'Users',
            items: [
                { label: 'Students', icon: 'bi bi-people', route: '/dashboard/librarian/students' },
            ]
        },
        {
            section: 'Transactions',
            items: [
                { label: 'Borrow', icon: 'bi bi-arrow-up-circle', route: '/dashboard/librarian/borrow' },
                { label: 'Returns', icon: 'bi bi-arrow-down-circle', route: '/dashboard/librarian/return' }
            ]
        },
        {
            section: 'Account',
            items: [
                { label: 'Profile', icon: 'bi bi-person-circle', route: '/dashboard/librarian/profile' }
            ]
        }
    ];

    public logout(): void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}