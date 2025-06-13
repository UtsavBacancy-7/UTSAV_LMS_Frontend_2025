import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/data/Models/user/user';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  providers: [MessageService]
})
export class ProfileCardComponent {
  isEditing = false;
  isEditingPassword = false;
  imagePreview: string | ArrayBuffer | null = null;
  isSaving = false;

  @Input() userProfile: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    isActive: false,
    profileImageUrl: '',
    role: '',
    passwordHash: ''
  };

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    // Initialize form with default empty values
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      isActive: [false],
      profileImage: [null],
      password: ['']
    });
  }

  ngOnChanges(): void {
    // Update form values when userProfile changes
    this.profileForm.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      mobileNo: this.userProfile.mobileNo,
      isActive: this.userProfile.isActive,
    });
  }

  togglePasswordEdit(): void {
    this.isEditingPassword = !this.isEditingPassword;
    if (!this.isEditingPassword) {
      this.profileForm.patchValue({ password: '' });
    }
  }

  onEditProfile(): void {
    this.isEditing = true;
    this.isEditingPassword = false;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.isEditingPassword = false;
    this.imagePreview = null;
    this.profileForm.patchValue({ password: '' });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Update form control
      this.profileForm.patchValue({ profileImage: file });
      this.profileForm.get('profileImage')?.updateValueAndValidity();
    }
  }

  onSaveProfile(): void {
    this.isSaving = true;
    if (this.profileForm.valid) {
      // Create the updated user object
      const updatedUser: IUser = {
        ...this.userProfile,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        mobileNo: this.profileForm.value.mobileNo,
        isActive: this.profileForm.value.isActive,
        profileImageUrl: this.imagePreview ? this.imagePreview.toString() : this.userProfile.profileImageUrl,
        passwordHash: this.profileForm.value.password || this.userProfile.passwordHash
      };

      this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: "success",
            summary: "Profile Updated",
            detail: "Your profile has been updated successfully"
          });
          this.isSaving = false;
          this.isEditing = false;
          this.isEditingPassword = false;
          // Update the local userProfile with the new data
          this.userProfile = { ...this.userProfile, ...updatedUser };
        },
        error: (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Update Failed",
            detail: err.error?.message || "Failed to update profile"
          });
          this.isSaving = false;
        }
      });
    }
  }
}