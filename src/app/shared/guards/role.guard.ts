import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getValidToken();

  // If no token, allow access (authGuard will handle authentication)
  if (!token) {
    return true;
  }

  const decoded = tokenService.decodeToken(token);
  const currentRole = decoded ? tokenService.extractRole(decoded) : null;

  // If no role found, redirect to login
  if (!currentRole) {
    tokenService.clearAuthData();
    return router.parseUrl('/auth/login');
  }

  // Extract requested role from URL
  const urlParts = state.url.split('/');
  const isDashboardRoute = urlParts[1] === 'dashboard';
  const requestedRole = isDashboardRoute ? urlParts[2] : null;

  // If trying to access a dashboard route
  if (isDashboardRoute) {
    // If trying to access a different role's dashboard
    if (requestedRole && requestedRole !== currentRole) {
      return router.parseUrl(`/dashboard/${currentRole}/home`);
    }
    // Allow access to their own dashboard
    return true;
  }

  // For non-dashboard routes
  return true;
};