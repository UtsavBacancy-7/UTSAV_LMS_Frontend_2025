import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { BooksListComponent } from './pages/book-list/books-list.component';
import { GenreComponent } from './pages/genre/genre.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingComponent } from './pages/settings/settings.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
    {
        path: '', component: AdminDashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'books', component: BooksListComponent },
            { path: 'librarians', component: UserComponent },
            { path: 'students', component: UserComponent },
            { path: 'genres', component: GenreComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'settings', component: SettingComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminDashboardRoutingModule { }