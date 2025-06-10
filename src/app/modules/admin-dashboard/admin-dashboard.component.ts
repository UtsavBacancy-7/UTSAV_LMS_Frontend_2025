import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent {
    constructor(private router: Router) { }

    public logout(): void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    toggleSidebar() {
        console.log('Sidebar toggled');
    }

    toggleTheme() {
        console.log('Theme toggled');
    }
}