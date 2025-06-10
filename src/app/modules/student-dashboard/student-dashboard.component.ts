import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.scss']
})

export class StudentDashboardComponent {
    constructor(private router: Router) { }

    public logout(): void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}