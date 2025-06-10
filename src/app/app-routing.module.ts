import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './shared/components/index/index.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { CustomPreloadService } from './shared/services/custom-preload.service';
import { redirectIfAuthenticated } from './shared/guards/redirect-if-auth.guard';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'auth',
    canActivate: [redirectIfAuthenticated],
    loadChildren: () => import('./shared/modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard/administrator',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'dashboard/librarian',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/librarian-dashboard/librarian-dashboard.module').then(m => m.LibrarianDashboardModule)
  },
  {
    path: 'dashboard/student',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/student-dashboard/student-dashboard.module').then(m => m.StudentDashboardModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

const routerOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadService
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule { }