import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
    declarations: [
        IndexComponent,
    ],
    imports: [
        CommonModule,
        AuthModule
    ],
    exports: [
        IndexComponent,
    ]
})

export class SharedModule { }