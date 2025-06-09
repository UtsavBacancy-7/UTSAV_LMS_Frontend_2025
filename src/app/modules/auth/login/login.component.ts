import { Component, EventEmitter, Output } from '@angular/core';

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

  onLogin() {
    console.log('Login data:', this.loginData);
    this.onClose();
    // Handle login logic here (call API etc.)
  }

  onReset() {
    this.loginData = {
      email: '',
      password: ''
    };
  }

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}