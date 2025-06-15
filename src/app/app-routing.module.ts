import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './shared/components/index/index.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { redirectIfAuthenticated } from './shared/guards/redirect-if-auth.guard';
import { CustomPreloadService } from './shared/services/custom-preload.service';
import { roleGuard } from './shared/guards/role.guard';
import { deactivateGuard } from './shared/guards/deactivate.guard';

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
    canActivate: [authGuard, roleGuard],
    loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'dashboard/librarian',
    canActivate: [authGuard, roleGuard],
    loadChildren: () => import('./modules/librarian-dashboard/librarian-dashboard.module').then(m => m.LibrarianDashboardModule)
  },
  {
    path: 'dashboard/student',
    canActivate: [authGuard, roleGuard],
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