import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent {
  @Input() role!: 'Admin' | 'Librarian' | 'Student';

  constructor(private router: Router, private messageService: MessageService) { }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
    this.messageService.add({
      severity: 'success',
      summary: 'Logged Out',
      detail: 'You have been successfully logged out.',
      life: 3000
    });
  }
}