import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { AuthModule } from './modules/auth/auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        IndexComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        AuthModule,
        RouterModule
    ],
    exports: [
        IndexComponent,
        SidebarComponent
    ]
})

export class SharedModule { }