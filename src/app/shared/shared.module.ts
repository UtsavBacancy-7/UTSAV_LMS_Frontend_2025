import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../modules/auth/auth.module';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';

@NgModule({
    declarations: [
        IndexComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AuthModule
    ],
    exports: [
        IndexComponent,
        HeaderComponent,
        FooterComponent
    ]
})

export class SharedModule { }