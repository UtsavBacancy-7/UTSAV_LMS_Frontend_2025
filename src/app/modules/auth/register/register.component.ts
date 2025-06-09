import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get passwordMismatch(): boolean | undefined {
    return this.registerForm.hasError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched;
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.registerForm.patchValue({ profileImageUrl: this.selectedImage });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.entries(this.registerForm.value).forEach(([key, value]) => {
        if (key === 'profileImageUrl' && this.selectedImage) {
          formData.append(key, this.selectedImage);
        } else {
          formData.append(key, value as string);
        }
      });

      console.log('Registering user...', formData);
    }
  }

  onReset() {
    this.registerForm.reset();
    this.selectedImage = null;
  }
}