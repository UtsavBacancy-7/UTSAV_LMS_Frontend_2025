import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { GenreComponent } from './genre/genre.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    BooksComponent,
    UserComponent,
    GenreComponent,
    ProfilePageComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminDashboardRoutingModule,
    RouterModule,
    SharedModule
  ]
})

export class AdminDashboardModule { }