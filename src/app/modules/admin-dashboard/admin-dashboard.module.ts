import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    BooksComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    RouterModule,
    SharedModule
  ]
})

export class AdminDashboardModule { }