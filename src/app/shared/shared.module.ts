import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { AuthModule } from './modules/auth/auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
    declarations: [
        IndexComponent,
        SidebarComponent,
        BookCardComponent,
    ],
    imports: [
        CommonModule,
        AuthModule,
        RouterModule
    ],
    exports: [
        IndexComponent,
        SidebarComponent,
        BookCardComponent
    ]
})

export class SharedModule { }