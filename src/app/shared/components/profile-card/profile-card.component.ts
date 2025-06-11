import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/data/Models/user/user';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  providers: [MessageService]
})
export class ProfileCardComponent {
  @Input() userProfile!: IUser;
  isEditing = false;

  constructor(private userService: UserService, private messageService: MessageService) { }

  toggleEdit() {
    if (this.isEditing) {
      this.onEditProfile(); // Save changes
    }
    this.isEditing = !this.isEditing;
  }

  onEditProfile() {
    this.userService.updateUser(this.userProfile.id, this.userProfile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile.' });
      }
    });
  }
}