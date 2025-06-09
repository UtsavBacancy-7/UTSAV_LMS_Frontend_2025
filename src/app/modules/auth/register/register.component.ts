import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      profileImageUrl: [null],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
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