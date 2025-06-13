import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { AuthModule } from './modules/auth/auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BookCardComponent } from './components/book-card/book-card.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { BookFormModalComponent } from './components/book-form-modal/book-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailsCardComponent } from './components/book-details-card/book-details-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BorrowListComponent } from './components/borrow-list/borrow-list.component';

@NgModule({
    declarations: [
        IndexComponent,
        SidebarComponent,
        BookCardComponent,
        DashboardNavbarComponent,
        ProfileCardComponent,
        BookFormModalComponent,
        BookDetailsCardComponent,
        UserFormComponent,
        BookListComponent,
        BorrowListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        RouterModule
    ],
    exports: [
        IndexComponent,
        SidebarComponent,
        BookCardComponent,
        DashboardNavbarComponent,
        ProfileCardComponent,
        BookFormModalComponent,
        BookDetailsCardComponent,
        BookListComponent,
        UserFormComponent,
        BorrowListComponent
    ]
})

export class SharedModule { }