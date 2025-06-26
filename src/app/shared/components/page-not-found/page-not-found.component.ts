import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.tokenService.clearAuthData();

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 3000);
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public goBack(): void {
    this.location.back();
  }
}