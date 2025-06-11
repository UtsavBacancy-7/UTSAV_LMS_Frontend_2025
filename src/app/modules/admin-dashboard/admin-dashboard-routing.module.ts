import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { BooksComponent } from './books/books.component';
import { UserComponent } from './user/user.component';
import { GenreComponent } from './genre/genre.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
    {
        path: '', component: AdminDashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'books', component: BooksComponent },
            { path: 'librarians', component: UserComponent },
            { path: 'students', component: UserComponent },
            { path: 'genres', component: GenreComponent },
            { path: 'profile', component: ProfilePageComponent },
            { path: 'settings', component: SettingsPageComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminDashboardRoutingModule { }