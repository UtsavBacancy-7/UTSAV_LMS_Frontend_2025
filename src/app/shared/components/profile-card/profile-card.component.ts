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
  imagePreview: string | ArrayBuffer | null = null;

  @Input() userProfile: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    isActive: false,
    profileImageUrl: '',
    role: ''
  };

  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private messageService: MessageService) {
    // Initialize form with default empty values
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      isActive: [false],
      profileImage: [null]
    });
  }

  ngOnChanges(): void {
    // Update form values when userProfile changes
    this.profileForm.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      mobileNo: this.userProfile.mobileNo,
      isActive: this.userProfile.isActive
    });
  }

  onEditProfile(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.imagePreview = null;
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
    if (this.profileForm.valid) {
      const formData = new FormData();

      // Append all form values
      Object.keys(this.profileForm.value).forEach(key => {
        if (key === 'profileImage' && this.profileForm.value[key]) {
          formData.append('image', this.profileForm.value[key]);
        } else {
          formData.append(key, this.profileForm.value[key]);
        }
      });

      // Here you would typically call your API to update the profile
      console.log('Form data to be saved:', formData);


      // Update the user profile with new values
      this.userProfile = {
        ...this.userProfile,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        mobileNo: this.profileForm.value.mobileNo,
        isActive: this.profileForm.value.isActive,
        profileImageUrl: this.imagePreview ? this.imagePreview.toString() : this.userProfile.profileImageUrl
      };

      this.userService.updateUser(this.userProfile).subscribe({

      })

      this.isEditing = false;
    }
  }
}