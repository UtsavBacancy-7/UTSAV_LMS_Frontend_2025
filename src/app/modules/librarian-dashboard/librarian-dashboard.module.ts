import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibrarianDashboardRoutingModule } from './librarian-dashboard-routing.module';
import { LibrarianDashboardComponent } from './librarian-dashboard.component';

@NgModule({
  declarations: [
    LibrarianDashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LibrarianDashboardRoutingModule,
    RouterModule
  ]
})

export class LibrarianDashboardModule { }