// user-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/data/Models/user/user';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: IUser | null = null;
  @Input() isEditMode = false;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<IUser>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.userForm) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      mobileNo: [this.user?.mobileNo || '', [Validators.required]],
      profileImageUrl: [this.user?.profileImageUrl || ''],
      passwordHash: [this.user?.passwordHash || '', this.isEditMode ? [] : [Validators.required]],
      role: [this.user?.role || 'Librarian'],
      isActive: [this.user?.isActive ?? true]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      if (this.isEditMode && this.user?.id) {
        formValue.id = this.user.id;
      }
      this.submit.emit(formValue);
    }
  }
}