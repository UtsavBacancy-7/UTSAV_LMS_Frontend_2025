import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { BooksListComponent } from './pages/book-list/books-list.component';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    BooksListComponent,
    UserComponent,
    GenreComponent,
    ProfileComponent,
    SettingsComponent
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