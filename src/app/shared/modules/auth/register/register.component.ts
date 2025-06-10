import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IRegister } from 'src/app/data/Models/authentication/register';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public selectedImage: File | null = null;
  public imageBase64: string = '';
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  public passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get passwordMismatch(): boolean | undefined {
    return this.registerForm.hasError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched;
  }

  public isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  public onRegister(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.isLoading = true;

      const registerData: IRegister = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        mobileNo: formValue.mobile,
        password: formValue.password,
        profileImageUrl: this.imageBase64 || null
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Success',
            detail: response.message,
            life: 3000
          });
          this.router.navigateByUrl('/auth/login');
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: error?.error?.message || 'Something went wrong',
            life: 3000
          });
        }
      });
      this.onReset();
    }
  }

  public onReset(): void {
    this.registerForm.reset();
    this.selectedImage = null;

    const fileInput = document.getElementById('bookImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}