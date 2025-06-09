import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output() openModal = new EventEmitter<'login' | 'register'>();

  openLogin() {
    this.openModal.emit('login');
  }

  openRegister() {
    this.openModal.emit('register');
  }
}