import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log("Login response:", response);

        const role = response?.user?.role?.toLowerCase();

        if (response?.token && role) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.user.id);
          sessionStorage.setItem('email', response.user.email);
          sessionStorage.setItem('role', role);

          this.messageService.add({
            severity: 'success',
            summary: 'Login Success',
            detail: 'You have been successfully logged in. Redirecting to dashboard...',
            life: 3000
          });

          setTimeout(() => {
            this.router.navigate([`/dashboard/${role}/home`]);
          }, 3000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: 'Unexpected response from server.',
            life: 3000
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error?.error?.message || 'Something went wrong',
          life: 3000
        });
      }
    });
  }

  onReset() {
    this.loginData = {
      email: '',
      password: ''
    };
  }
}