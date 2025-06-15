import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';
import { BorrowListComponent } from './pages/borrow-list/borrow-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentBookListComponent } from './pages/student-book-list/student-book-list.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { StudentDashboardComponent } from './student-dashboard.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    HomeComponent,
    ProfileComponent,
    StudentBookListComponent,
    BorrowListComponent,
    UserHistoryComponent
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    SharedModule,
    ChartModule,
    RouterModule
  ]
})

export class StudentDashboardModule { }