import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/data/models/user/user';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})

export class ProfileCardComponent {
  public isEditing = false;
  public isEditingPassword = false;
  public imagePreview: string | ArrayBuffer | null = null;
  public isSaving = false;
  public profileForm: FormGroup;
  canEditName: boolean = false;
  canEditEmail: boolean = false;

  @Input() userProfile: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    isActive: true,
    profileImageUrl: '',
    role: '',
    passwordHash: ''
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, ValidationService.nameValidator, ValidationService.noWhitespaceValidator]],
      lastName: ['', [Validators.required, ValidationService.nameValidator, ValidationService.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, ValidationService.indianMobileValidator]],
      isActive: [true],
      profileImage: [null],
      password: ['']
    });
  }

  public ngOnChanges(): void {
    this.profileForm.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      mobileNo: this.userProfile.mobileNo,
      isActive: true,
    });
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('email')?.disable();
  }

  public togglePasswordEdit(): void {
    this.isEditingPassword = !this.isEditingPassword;
    if (!this.isEditingPassword) {
      this.profileForm.patchValue({ password: '' });
    }
  }

  public onEditProfile(): void {
    this.isEditing = true;
    this.isEditingPassword = false;
  }

  public onCancelEdit(): void {
    this.isEditing = false;
    this.isEditingPassword = false;
    this.imagePreview = null;
    this.profileForm.patchValue({ password: '' });
  }

  public onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size > 2 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size should not exceed 2MB',
        })
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      this.profileForm.patchValue({ profileImage: file });
      this.profileForm.get('profileImage')?.updateValueAndValidity();
    }
  }

  public onSaveProfile(): void {
    this.isSaving = true;

    if (this.profileForm.valid) {
      const updatedUser: IUser = {
        ...this.userProfile,
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        email: this.userProfile.email,
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