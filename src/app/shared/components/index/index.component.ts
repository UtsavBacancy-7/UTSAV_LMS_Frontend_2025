import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent {
  showLogin = false;
  showRegister = false;

  onOpenModal(type: 'login' | 'register') {
    this.showLogin = type === 'login';
    this.showRegister = type === 'register';
  }

  onCloseModal() {
    this.showLogin = false;
    this.showRegister = false;
  }
}