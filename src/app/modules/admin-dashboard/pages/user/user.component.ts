import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/data/Models/user/user';
import { MessageService } from 'primeng/api';
import { PatchOperation } from 'src/app/data/Models/patchOperation';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  viewMode: 'table' | 'grid' = 'table';
  searchTerm: string = '';
  userType: 'students' | 'librarians' = 'students';
  isLibrariansView: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.userType = urlSegments[0]?.path === 'librarians' ? 'librarians' : 'students';
      this.isLibrariansView = this.userType === 'librarians';
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const serviceMethod = this.isLibrariansView ?
      this.userService.getUsersByRole('Librarian') :
      this.userService.getUsersByRole('Student');

    this.messageService.add({
      severity: 'info',
      summary: 'Loading Users',
      detail: 'Fetching user data. Please wait...',
      life: 2000
    });

    serviceMethod.subscribe({
      next: (response: any) => {
        this.users = response?.data || [];
        this.filteredUsers = [...this.users];

        this.messageService.add({
          severity: 'success',
          summary: 'Users Loaded',
          detail: 'All users have been successfully fetched.',
          life: 3000
        });
      },
      error: (error) => {
        this.users = [];
        this.filteredUsers = [];

        this.messageService.add({
          severity: 'error',
          summary: 'Fetch Failed',
          detail: 'An error occurred while retrieving user data.',
          life: 4000
        });
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (term) {
      this.filteredUsers = this.users.filter(user => {
        return (
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          (user.mobileNo && user.mobileNo.toLowerCase().includes(term))
        );
      });
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  getFullName(user: IUser): string {
    return `${user.firstName} ${user.lastName}`;
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Failed to delete user:', error);
        }
      });
    }
  }

  loadingUserId: number | null = null;

  toggleStatus(user: IUser): void {
    const newStatus = !user.isActive;
    const patch: PatchOperation[] = [
      {
        op: 'replace',
        path: '/isActive',
        value: newStatus
      }
    ];

    this.loadingUserId = user.id!;

    this.userService.patchUser(user.id!, patch).subscribe({
      next: () => {
        user.isActive = newStatus;
        this.loadingUserId = null;
      },
      error: (err) => {
        this.loadingUserId = null;
        user.isActive = !newStatus;
      }
    });
  }
}