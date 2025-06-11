import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
    sidebarOptions = [
        {
            section: 'Dashboard',
            items: [
                { label: 'Overview', icon: 'bi bi-speedometer2', route: '/dashboard/administrator/home' }
            ]
        },
        {
            section: 'Library',
            items: [
                { label: 'Books', icon: 'bi bi-book', route: '/dashboard/administrator/books' },
                { label: 'Categories', icon: 'bi bi-tags', route: '/dashboard/administrator/categories' },
            ]
        },
        {
            section: 'Users',
            items: [
                { label: 'Students', icon: 'bi bi-people', route: '/dashboard/administrator/students' },
                { label: 'Librarians', icon: 'bi bi-person-workspace', route: '/dashboard/administrator/librarians' }
            ]
        },
        {
            section: 'Transactions',
            items: [
                { label: 'Borrow', icon: 'bi bi-arrow-up-circle', route: '/dashboard/administrator/transactions/borrow' },
                { label: 'Returns', icon: 'bi bi-arrow-down-circle', route: '/dashboard/administrator/transactions/return' }
            ]
        },
        {
            section: 'Account',
            items: [
                { label: 'Profile', icon: 'bi bi-person-circle', route: '/dashboard/administrator/profile' },
                { label: 'Settings', icon: 'bi bi-gear', route: '/dashboard/administrator/settings' },
            ]
        }
    ];

    constructor(private router: Router) { }

    public logout(): void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    toggleSidebar() {
        // Implement sidebar toggle logic
        const sidebar = document.querySelector('.sidebar');
        sidebar?.classList.toggle('collapsed');
    }

    toggleTheme() {
        // Implement theme toggle logic
        document.body.classList.toggle('dark-theme');
    }
}