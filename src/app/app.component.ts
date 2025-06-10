import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public isAuthRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAuthRoute = this.router.url.startsWith('/auth');
    });
  }
}