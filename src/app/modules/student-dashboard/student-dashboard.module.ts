import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { StudentDashboardComponent } from './student-dashboard.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    RouterModule
  ]
})

export class StudentDashboardModule { }