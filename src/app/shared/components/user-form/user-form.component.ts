import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/data/models/user/user';
import { CanComponentDeactivate } from '../../guards/deactivate.guard';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements CanComponentDeactivate, OnInit, OnChanges {
  public userForm!: FormGroup;
  isDirty = false;
  formSubmitted = false;

  @Input() user: IUser | null = null;
  @Input() isEditMode = false;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<IUser>();

  constructor(private fb: FormBuilder) { }

  canDeactivate(): boolean {
    if (this.isDirty && !this.formSubmitted) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.userForm) {
      this.initForm();
    }
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
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

  public onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      if (this.isEditMode && this.user?.id) {
        formValue.id = this.user.id;
      }
      this.formSubmitted = true;
      this.submit.emit(formValue);
    }
  }
}