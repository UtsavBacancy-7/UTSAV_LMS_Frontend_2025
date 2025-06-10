import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './librarian-dashboard.component.html',
    styleUrls: ['./librarian-dashboard.component.scss']
})

export class LibrarianDashboardComponent {
    constructor(private router: Router) { }

    public logout(): void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}