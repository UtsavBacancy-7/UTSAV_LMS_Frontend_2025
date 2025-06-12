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
  isLoading: Boolean = false;

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
    this.isLoading = true;
    const serviceMethod = this.isLibrariansView ?
      this.userService.getUsersByRole('Librarian') :
      this.userService.getUsersByRole('Student');

    serviceMethod.subscribe({
      next: (response: any) => {
        this.users = response?.data || [];
        this.filteredUsers = [...this.users];
        this.isLoading = false;
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

  handleUserSubmit(user: IUser) {
    if (this.isEditMode) {
      this.userService.updateUser(user.id!, user).subscribe(() => {
        this.loadUsers();
        this.closeFormModal();
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.loadUsers();
        this.closeFormModal();
      });
    }
  }

  showFormModal = false;
  selectedUser: IUser | null = null;
  isEditMode = false;

  openAddUserForm() {
    this.isEditMode = false;
    this.selectedUser = null;
    this.showFormModal = true;
  }

  openEditUserForm(user: IUser) {
    this.isEditMode = true;
    this.selectedUser = JSON.parse(JSON.stringify(user));
    this.showFormModal = true;
  }

  closeFormModal() {
    this.showFormModal = false;
    this.selectedUser = null;
  }
}